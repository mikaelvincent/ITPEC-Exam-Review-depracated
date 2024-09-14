import fitz
import re
import os
from PIL import Image, ImageOps

# Constants for easy reconfiguration
INPUT_DIR = "questionnaires"        # Folder containing input PDFs
OUTPUT_DIR = "output"               # Folder where all processed images will be saved
ERROR_LOG_FILE = "error_logs.txt"   # Error log file (created only if errors occur)
DPI = 300                           # Output image DPI
PADDING = 0                         # Padding added around cropped images
IMAGE_FORMAT = "png"                # Output image format
FOOTER_THRESHOLD_RATIO = 0.9        # Fallback threshold to exclude footer (bottom 10% of the page)
QUESTION_PATTERN = r'Q\d+\s*'       # Regex to capture question numbers

def extract_questions_from_pdf(pdf_file, error_log):
    """
    Extracts questions from a PDF, identifies each question's bounding box, 
    and saves the content as an image. Skips the first page to avoid sample 
    questions and dynamically excludes footers from the last question on the page.
    
    Parameters:
        pdf_file (str): The path to the input PDF.
        error_log (list): List to store error messages.
    """
    try:
        pdf_document = fitz.open(pdf_file)
        page_count = pdf_document.page_count

        # Process each page, starting from the 2nd page
        for page_num in range(1, page_count):
            page = pdf_document.load_page(page_num)
            text = page.get_text("text")

            # Find all question markers on the page
            question_markers = re.findall(QUESTION_PATTERN, text)

            if len(question_markers) > 0:
                # Get bounding boxes of question markers
                question_instances = [page.search_for(marker.strip()) for marker in question_markers]
                question_instances = [item[0] for item in question_instances if len(item) > 0]

                for i in range(len(question_instances)):
                    try:
                        # Define the region for each question between markers
                        current_question_instance = question_instances[i]
                        next_question_instance = question_instances[i + 1] if i + 1 < len(question_instances) else None

                        save_question_as_image(
                            current_question_instance, next_question_instance,
                            pdf_document, page_num, pdf_file, error_log
                        )
                    except Exception as e:
                        error_log.append(
                            f"\nPDF File: {os.path.basename(pdf_file)}\n"
                            f"Page Number: {page_num + 1}\n"
                            f"Error Message: {str(e)}\n"
                        )

        pdf_document.close()
    except Exception as e:
        error_log.append(
            f"\nPDF File: {os.path.basename(pdf_file)}\n"
            f"Error processing the entire PDF: {str(e)}\n"
        )

def save_question_as_image(current_question_instance, next_question_instance, pdf_document, page_num, pdf_file, error_log):
    """
    Saves the content of a question as an image. Crops the page region 
    between two question markers, dynamically excludes footers, and adds padding.

    Parameters:
        current_question_instance (fitz.Rect): Bounding box of the current question.
        next_question_instance (fitz.Rect): Bounding box of the next question (if available).
        pdf_document (fitz.Document): The PDF document object.
        page_num (int): Current page number being processed.
        pdf_file (str): The path to the input PDF file.
        error_log (list): List to store error messages.
    """
    page = pdf_document.load_page(page_num)

    # Determine the bottom clipping boundary
    bottom_y = next_question_instance.y0 if next_question_instance else None
    if not bottom_y:
        # No next question; check for a footer and exclude it if present
        blocks = page.get_text("blocks")
        last_block_y = max([block[3] for block in blocks]) if blocks else page.rect.height

        # Exclude the footer if the last block is within the bottom 10% of the page
        if last_block_y > page.rect.height * FOOTER_THRESHOLD_RATIO:
            bottom_y = page.rect.height * FOOTER_THRESHOLD_RATIO
        else:
            bottom_y = last_block_y

    # Define the region to clip
    clip_rect = fitz.Rect(
        0,                              # Left edge of the page
        current_question_instance.y0,   # Top edge based on current question marker
        page.rect.width,                # Right edge of the page
        bottom_y                        # Bottom of the next question or the top of the footer
    )

    # Generate an image of the specified region
    pix = page.get_pixmap(clip=clip_rect, dpi=DPI)

    # Extract question number from the current question's bounding box
    question_number_text = page.get_textbox(current_question_instance)
    question_number_match = re.search(r'Q\d+', question_number_text.strip())

    if question_number_match:
        question_number = question_number_match.group(0)
    else:
        error_log.append(
            f"\nPDF File: {os.path.basename(pdf_file)}\n"
            f"Page Number: {page_num + 1}\n"
            f"Error Message: Could not extract question number from bounding box text: {question_number_text.strip()}\n"
        )
        return

    # Save the image file (in the OUTPUT_DIR)
    output_image = os.path.join(OUTPUT_DIR, f"{os.path.splitext(os.path.basename(pdf_file))[0]}_{question_number}.{IMAGE_FORMAT}")
    pix.save(output_image)

def process_images():
    """
    Processes all saved images by cropping whitespace and adding padding.
    
    This function iterates over all image files in the output directory,
    crops any excess whitespace, and adds a uniform padding around the image
    to ensure proper formatting. The modified images are saved back to the same directory.
    """
    for img_file in os.listdir(OUTPUT_DIR):
        if img_file.endswith(f".{IMAGE_FORMAT}"):
            img_path = os.path.join(OUTPUT_DIR, img_file)
            img = Image.open(img_path)

            # Crop whitespace from the image
            img_cropped = ImageOps.invert(img.convert("RGB")).convert("L").point(lambda x: 0 if x < 128 else 255, '1')
            bbox = img_cropped.getbbox()
            if bbox:
                img = img.crop(bbox)

            # Add uniform padding around the image
            new_img = ImageOps.expand(img, border=PADDING, fill='white')

            # Save the modified image
            new_img.save(img_path)

def process_all_pdfs():
    """
    Main function to process all PDFs in the input folder. Each PDF is parsed, 
    questions are extracted and saved as images, and footers are dynamically excluded.
    If any errors occur during processing, they are logged.
    
    This function ensures that the output directory exists before starting the process.
    """
    error_log = []

    # Ensure the output directory exists
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    # Iterate over all PDF files in the input directory
    for pdf_file in os.listdir(INPUT_DIR):
        if pdf_file.endswith(".pdf"):
            pdf_path = os.path.join(INPUT_DIR, pdf_file)

            # Extract and process each PDF
            extract_questions_from_pdf(pdf_path, error_log)
    
    # Process all images saved in the output directory
    process_images()

    # Write error log if any errors occurred
    if error_log:
        with open(ERROR_LOG_FILE, 'w', encoding='utf-8') as log_file:
            log_file.write("\n".join(error_log))

# Run the processing
if __name__ == "__main__":
    process_all_pdfs()
