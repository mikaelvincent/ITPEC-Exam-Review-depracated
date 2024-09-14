import os
import re
import mysql.connector

# Constants for configuration
DB_HOST = 'REDACTED'                                # Database host
DB_USER = 'REDACTED'                                # Database username
DB_PASSWORD = 'REDACTED'                            # Database password
DB_NAME = 'REDACTED'                                # Database name

ANSWERS_DIR = 'answers'                             # Directory containing answer files
QUESTIONS_DIR = 'questions'                         # Directory containing question image files

ANSWER_FILE_EXTENSION = '.txt'                      # Extension for answer files
QUESTION_FILE_EXTENSION = '.png'                    # Extension for question image files

ANSWER_MAPPING = {'a': 0, 'b': 1, 'c': 2, 'd': 3}   # Mapping of answer letters to integers

def main():
    """
    Main function to process answer and question files, and insert records into the database.
    """
    # Connect to the MySQL database
    connection = connect_to_database()
    if not connection:
        return

    cursor = connection.cursor()

    # Get sets of base filenames (without extensions) from answers and questions directories
    answer_bases = get_base_filenames(ANSWERS_DIR, ANSWER_FILE_EXTENSION)
    question_bases = get_base_filenames(QUESTIONS_DIR, QUESTION_FILE_EXTENSION)

    # Identify and report any mismatches between answers and questions
    report_file_mismatches(answer_bases, question_bases)

    # Process files that have both answer and question
    common_bases = answer_bases & question_bases

    for base_name in sorted(common_bases):
        # Extract exam source and question number from the base filename
        exam_source, question_number = extract_exam_source_and_question_number(base_name)
        if exam_source is None or question_number is None:
            print(f"Skipping file with unrecognized format: {base_name}")
            continue

        # Read the correct answer from the answer file
        answer_file_path = os.path.join(ANSWERS_DIR, base_name + ANSWER_FILE_EXTENSION)
        correct_answer = read_correct_answer(answer_file_path)
        if correct_answer is None:
            continue

        # Construct the question image URL
        question_image_url = base_name + QUESTION_FILE_EXTENSION

        # Insert the record into the database
        success = insert_question_record(cursor, exam_source, question_number, question_image_url, correct_answer)
        if success:
            connection.commit()
            print(f"Inserted: {exam_source} Q{question_number}")
        else:
            connection.rollback()

    # Close the database connection
    cursor.close()
    connection.close()
    print("Database connection closed.")

def connect_to_database():
    """
    Connects to the MySQL database using the provided credentials.

    Returns:
        A MySQLConnection object if the connection is successful, None otherwise.
    """
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        print("Successfully connected to the database.")
        return connection
    except mysql.connector.Error as err:
        print(f"Error: Could not connect to database - {err}")
        return None

def get_base_filenames(directory, extension):
    """
    Retrieves the set of base filenames (without extensions) from the specified directory.

    Args:
        directory (str): The directory to search for files.
        extension (str): The file extension to filter by.

    Returns:
        A set of base filenames.
    """
    filenames = [f for f in os.listdir(directory) if f.endswith(extension)]
    base_filenames = set(os.path.splitext(f)[0] for f in filenames)
    return base_filenames

def report_file_mismatches(answer_bases, question_bases):
    """
    Identifies and reports any mismatches between the answer and question files.

    Args:
        answer_bases (set): Set of base filenames from answer files.
        question_bases (set): Set of base filenames from question files.
    """
    answers_without_questions = answer_bases - question_bases
    if answers_without_questions:
        print("Answer files without corresponding question images:")
        for base in sorted(answers_without_questions):
            print(f"- {base}{ANSWER_FILE_EXTENSION}")

    questions_without_answers = question_bases - answer_bases
    if questions_without_answers:
        print("Question images without corresponding answer files:")
        for base in sorted(questions_without_answers):
            print(f"- {base}{QUESTION_FILE_EXTENSION}")

def extract_exam_source_and_question_number(base_name):
    """
    Extracts the exam source and question number from the base filename.

    Args:
        base_name (str): The base filename (without extension).

    Returns:
        A tuple (exam_source, question_number), or (None, None) if the format is unrecognized.
    """
    # Regular expression to match the expected filename pattern
    match = re.match(r'^(.*)_Q(\d+)$', base_name)
    if match:
        exam_source = match.group(1)
        question_number = int(match.group(2))
        return exam_source, question_number
    else:
        return None, None

def read_correct_answer(file_path):
    """
    Reads the correct answer from the answer file and maps it to an integer.

    Args:
        file_path (str): The path to the answer file.

    Returns:
        The integer representation of the correct answer, or None if invalid.
    """
    try:
        with open(file_path, 'r') as file:
            letter = file.read().strip().lower()
            correct_answer = ANSWER_MAPPING.get(letter)
            if correct_answer is None:
                print(f"Invalid answer '{letter}' in file {file_path}")
            return correct_answer
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return None

def insert_question_record(cursor, exam_source, question_number, question_image_url, correct_answer):
    """
    Inserts a question record into the database.

    Args:
        cursor: The MySQL cursor object.
        exam_source (str): The exam source.
        question_number (int): The question number.
        question_image_url (str): The question image filename.
        correct_answer (int): The integer representation of the correct answer.

    Returns:
        True if the insertion is successful, False otherwise.
    """
    try:
        insert_query = (
            "INSERT INTO questions (examSource, questionNumber, questionImageUrl, correctAnswer) "
            "VALUES (%s, %s, %s, %s)"
        )
        cursor.execute(insert_query, (exam_source, question_number, question_image_url, correct_answer))
        return True
    except mysql.connector.Error as err:
        print(f"Error inserting into database for {exam_source} Q{question_number}: {err}")
        return False

if __name__ == "__main__":
    main()
