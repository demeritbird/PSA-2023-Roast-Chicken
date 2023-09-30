import sqlite3
import os

def create_database(db_path="embeddings.db"):
    """
    Creates a SQLite3 database at the given path.
    """

    if os.path.exists(db_path):
        print("Database already exists. Continuing execution...")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS skill_embeddings (
        skill TEXT PRIMARY KEY,
        embedding TEXT
    )
    ''')

    print(f"Database created at '{db_path}'.")
    
    conn.commit()
    conn.close()


def delete_embedding(skill, db_path="embeddings.db"):
    """
    Deletes the embedding for the given skill from the database.

    Args:
    - skill (str): The skill whose embedding needs to be deleted.
    - db_path (str): Path to the SQLite3 database. Default is "embeddings.db".

    Returns:
    - bool: True if the deletion was successful, False otherwise.
    """

    # Connect to the database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Delete the entry for the given skill
    cursor.execute("DELETE FROM skill_embeddings WHERE skill=?", (skill,))
    conn.commit()

    # Check if the deletion was successful
    cursor.execute("SELECT embedding FROM skill_embeddings WHERE skill=?", (skill,))
    result = cursor.fetchone()

    # Close the database connection
    conn.close()

    if result:
        return False  # Entry still exists
    else:
        return True  # Entry successfully deleted

def delete_database(db_path="embeddings.db"):
    """
    Deletes the SQLite3 database file from the filesystem.

    Args:
    - db_path (str): Path to the SQLite3 database. Default is "embeddings.db".
    """
    if os.path.exists(db_path):
        os.remove(db_path)
        print(f"Database '{db_path}' has been deleted.")
    else:
        print(f"Database '{db_path}' does not exist.")