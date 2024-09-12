import os

# Constants
DIRECTORY = os.getcwd()
FOLDER_1 = 'Answer Keys'
FOLDER_2 = 'Questionnaires'

def compare_filenames(folder1, folder2):
    """
    Compares the filenames between two folders. Returns True if both folders have the same filenames,
    otherwise returns False.
    
    :param folder1: Path to the first folder
    :param folder2: Path to the second folder
    """
    # Get the list of filenames in each directory, ignoring subdirectories
    files1 = set([f for f in os.listdir(folder1) if os.path.isfile(os.path.join(folder1, f))])
    files2 = set([f for f in os.listdir(folder2) if os.path.isfile(os.path.join(folder2, f))])
    
    # Compare the sets of filenames
    return files1 == files2

def main():
    folder1_path = os.path.join(DIRECTORY, FOLDER_1)
    folder2_path = os.path.join(DIRECTORY, FOLDER_2)
    
    # Check if both folders exist
    if os.path.exists(folder1_path) and os.path.exists(folder2_path):
        result = compare_filenames(folder1_path, folder2_path)
        print(result)
    else:
        print("One or both directories do not exist.")

if __name__ == "__main__":
    main()
