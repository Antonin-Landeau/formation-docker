from sqlalchemy import Column, String, Integer


from .database import Base

class CommandModel(Base):
 __tablename__ = "commands"

 id =Column(Integer, primary_key=True, unique=True, autoincrement=True)
 name =Column(String(50),  unique=True, nullable=False)
 command =Column(String(100),  unique=True, nullable=False)
 description =Column(String(200),  unique=True, nullable=False)
 comment =Column(String(200))
 

