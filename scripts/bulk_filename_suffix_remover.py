import os

# Constants
DIRECTORY = os.getcwd()
FILE_EXTENSIONS = [".pdf"]
TO_REMOVE = ["_Answer", "_Answers", "_Ans"]

def rename_files(directory, extensions):
    """
    Renames files in the specified directory by removing specified substrings from the file names
    that end with any of the provided extensions.
    
    :param directory: The path to the directory containing the files to be renamed.
    :param extensions: A list of file extensions to check for renaming.
    """
    for filename in os.listdir(directory):
        original_filename = filename
        for ext in extensions:
            if filename.endswith(ext):
                for removal in TO_REMOVE:
                    if filename.endswith(removal + ext):
                        filename = filename.replace(removal + ext, ext)
                        break
                if filename != original_filename:
                    os.rename(os.path.join(directory, original_filename), os.path.join(directory, filename))
                    print(f"Renamed '{original_filename}' to '{filename}'")

def main():
    rename_files(DIRECTORY, FILE_EXTENSIONS)

if __name__ == "__main__":
    main()
