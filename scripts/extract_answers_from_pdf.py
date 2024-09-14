import fitz
import re
import os

# Constants for configuration
ANSWER_KEY_DIR = "answer_keys"                                              # Directory containing input PDF files with answer keys
OUTPUT_DIR = "output"                                                       # Directory to save individual question answer text files
ERROR_LOG_FILE = "error_logs.txt"                                           # Log file to capture errors and warnings
QUESTION_PATTERN = r'(?:Q)?([0-9０-９]+)\s*([a-dａ-ｄ](?:,\s*[a-dａ-ｄ])*)'   # Regex to match question number and answers (handles ASCII and full-width characters)
TOTAL_QUESTIONS = 80                                                        # Expected number of questions per PDF

# Translation table to convert full-width characters to ASCII
fullwidth_chars = '０１２３４５６７８９ａｂｃｄ'
ascii_chars = '0123456789abcd'
translation_table = str.maketrans(fullwidth_chars, ascii_chars)

def extract_answers_from_pdf(pdf_file, error_log):
    """
    Extracts answers from the specified PDF file and writes each question's answer 
    to a separate text file. Logs missing questions and multiple answers.

    Parameters:
    pdf_file (str): Path to the PDF file containing the answer key.
    error_log (list): A list to capture error messages during processing.
    """
    try:
        # Open the PDF document
        pdf_document = fitz.open(pdf_file)
        page_count = pdf_document.page_count  # Get the number of pages in the PDF
        parsed_question_numbers = set()  # Set to track the question numbers that are parsed

        # Process each page in the PDF
        for page_num in range(page_count):
            page = pdf_document.load_page(page_num)
            text = page.get_text("text")  # Extract the text content of the page

            # Find all question-answer patterns on the current page
            question_answers = re.findall(QUESTION_PATTERN, text)

            if question_answers:
                for question_num, answer in question_answers:
                    try:
                        # Convert full-width characters to ASCII
                        question_num = question_num.translate(translation_table)
                        answer = answer.translate(translation_table)

                        # Add the parsed question number to the set
                        parsed_question_numbers.add(int(question_num))

                        # Save each answer to a separate text file
                        save_answer_to_file(pdf_file, question_num, answer)

                        # Log if multiple answers are found for a single question
                        if ',' in answer:
                            error_log.append(
                                f"PDF File: {os.path.basename(pdf_file)} - Multiple answers detected for Q{question_num}: {answer}"
                            )
                    except Exception as e:
                        # Log any errors encountered while processing a question
                        error_log.append(
                            f"\nPDF File: {os.path.basename(pdf_file)}\n"
                            f"Page Number: {page_num + 1}\n"
                            f"Error: {str(e)}\n"
                        )

        pdf_document.close()  # Close the PDF document after processing

        # Check if all expected questions (1 to 80) were parsed
        missing_questions = set(range(1, TOTAL_QUESTIONS + 1)) - parsed_question_numbers
        if missing_questions:
            # Log any missing questions
            error_log.append(
                f"\nPDF File: {os.path.basename(pdf_file)}\n"
                f"Missing Questions: {', '.join(f'Q{q}' for q in sorted(missing_questions))}\n"
            )

    except Exception as e:
        # Log any errors encountered while processing the entire PDF
        error_log.append(
            f"\nPDF File: {os.path.basename(pdf_file)}\n"
            f"Error while processing PDF: {str(e)}\n"
        )

def save_answer_to_file(pdf_file, question_number, answer):
    """
    Saves the answer for a specific question to a separate text file. The file is named
    based on the PDF file and question number.

    Parameters:
    pdf_file (str): The path to the PDF file being processed.
    question_number (str): The question number (e.g., '1', '2', etc.).
    answer (str): The extracted answer (e.g., 'a', 'b', 'c', 'd', or combinations).
    """
    # Extract the base name of the PDF (without extension) to use in the output file name
    pdf_name = os.path.splitext(os.path.basename(pdf_file))[0]

    # Construct the output file name in the format "pdfname_Q<number>.txt"
    output_file = os.path.join(OUTPUT_DIR, f"{pdf_name}_Q{question_number}.txt")

    # Ensure that the answer contains only ASCII characters
    answer = answer.encode('ascii', errors='ignore').decode()

    # Write the answer to the output file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(answer)

def process_all_answer_keys():
    """
    Processes all PDF files in the input directory. For each PDF, it extracts the answers 
    and saves them to individual files. Logs any errors or inconsistencies such as missing 
    questions or multiple answers.

    This function ensures that the output directory exists, processes each PDF, and writes
    all errors and warnings to the error log file.
    """
    error_log = []  # List to store error messages and warnings

    # Ensure the output directory exists, create it if not
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    # Iterate through all files in the input directory (ANSWER_KEY_DIR)
    for pdf_file in os.listdir(ANSWER_KEY_DIR):
        if pdf_file.endswith(".pdf"):  # Only process PDF files
            pdf_path = os.path.join(ANSWER_KEY_DIR, pdf_file)

            # Extract answers from the current PDF file
            extract_answers_from_pdf(pdf_path, error_log)

    # Write any collected errors and warnings to the error log file
    if error_log:
        with open(ERROR_LOG_FILE, 'w', encoding='utf-8') as log_file:
            log_file.write("\n".join(error_log))

# Start processing all PDFs in the input directory
if __name__ == "__main__":
    process_all_answer_keys()
