import os
import fitz  # PyMuPDF
import base64
import requests

# Constants
API_KEY = "your_api_key_here"
API_URL = "https://api.openai.com/v1/chat/completions"
PDF_DIRECTORY = "."
OUTPUT_DIRECTORY = "."

# Headers for OpenAI API
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

def encode_image_to_base64(image):
    """
    Encode image data to base64.
    """
    image_bytes = image.tobytes("png")
    return base64.b64encode(image_bytes).decode('utf-8')

def extract_page_as_image(pdf_path, page_number):
    """
    Extract a single page from a PDF as an image.
    """
    doc = fitz.open(pdf_path)
    page = doc.load_page(page_number)
    pix = page.get_pixmap()
    return pix

def query_openai_with_image(base64_image):
    """
    Send a base64 encoded image to OpenAI for transcription.
    """
    payload = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": f"data:image/png;base64,{base64_image}"
            }
        ]
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def transcribe_pdf(pdf_path):
    """
    Transcribe all pages of a PDF file and save the output to a text file.
    """
    output_filename = f"{os.path.splitext(os.path.basename(pdf_path))[0]}.txt"
    output_path = os.path.join(OUTPUT_DIRECTORY, output_filename)
    with open(output_path, 'w', encoding='utf-8') as file:
        doc = fitz.open(pdf_path)
        for page_number in range(doc.page_count):
            print(f"Processing page {page_number + 1} of {pdf_path}...")
            image = extract_page_as_image(pdf_path, page_number)
            base64_image = encode_image_to_base64(image)
            response = query_openai_with_image(base64_image)
            try:
                text = response['choices'][0]['message']['content']
                file.write(f"{text}\n\n")
                print(f"Transcribed text for page {page_number + 1} saved.")
            except KeyError:
                print(f"Failed to transcribe page {page_number + 1}.")
                file.write(f"Failed to transcribe page {page_number + 1}.\n\n")

def process_all_pdfs(directory):
    """
    Process all PDF files in the specified directory.
    """
    for filename in os.listdir(directory):
        if filename.lower().endswith('.pdf'):
            pdf_path = os.path.join(directory, filename)
            transcribe_pdf(pdf_path)
            print(f"Finished processing {filename}")

if __name__ == "__main__":
    process_all_pdfs(PDF_DIRECTORY)
