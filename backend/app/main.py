from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CommandBody(BaseModel):
    name: str
    description: str
    command: str
    comment: str


class Commands(BaseModel):
    commands: List[CommandBody]


commands = Commands(
    commands=[
        CommandBody(
            name="Command 1",
            description="this is the command 1",
            command="command",
            comment="this is a comment",
        ),
        CommandBody(
            name="Command 2",
            description="this is the command 2",
            command="command",
            comment="this is a comment",
        ),
    ]
)


@app.get("/")
def root():
    return {"message": "server is running !"}


@app.get("/commands")
def get_commands():
    return commands.model_dump()
