from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return {"message": "server is running !"}


@app.get("/commands")
def get_commands():
    commands = [
        {
            "command": "ls",
            "description": "List files and directories in the current directory",
        },
        {"command": "pwd", "description": "Print the current working directory"},
        {"command": "cd", "description": "Change the current working directory"},
        {"command": "mkdir", "description": "Create a new directory"},
        {"command": "rmdir", "description": "Remove a directory"},
        {"command": "touch", "description": "Create a new file"},
        {"command": "rm", "description": "Remove files or directories"},
        {"command": "cat", "description": "Print the content of a file"},
        {"command": "echo", "description": "Print a string"},
        {"command": "clear", "description": "Clear the terminal screen"},
        {"command": "history", "description": "Print the history of commands"},
    ]

    return commands
