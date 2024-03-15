from fastapi import FastAPI, Depends
from sqlalchemy import desc
from sqlalchemy.orm import Session
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware


from . import models

from .database import SessionLocal

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CommandBody(BaseModel):
    name: str
    description: str
    command: str
    comment: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "server is running !"}


@app.post("/command")
def create_command(command: CommandBody, db: Session = Depends(get_db)):
    new_command = models.CommandModel()
    new_command.name = command.name
    new_command.description = command.description
    new_command.command = command.command
    new_command.comment = command.comment

    db.add(new_command)
    db.commit()
    db.refresh(new_command)

    return {"message": "Command created"}


@app.get("/commands")
def get_commands(db: Session = Depends(get_db)):
    commands = (
        db.query(models.CommandModel).order_by(desc(models.CommandModel.id)).all()
    )

    return commands
