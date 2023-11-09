from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

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
def create_command(db:Session = Depends(get_db)):
  new_command = models.CommandModel()
  new_command.name = "Test",
  new_command.description =" Descreiption"
  new_command.command = "docker compose up"
  new_command.comment = "comment"

  db.add(new_command)
  db.commit()
  db.refresh(new_command)
  
  
  return {"message": "Command created"}

@app.get("/commands")
def get_commands(db:Session = Depends(get_db)):
  commands = db.query(models.CommandModel).all()

  return commands