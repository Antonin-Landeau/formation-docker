# Use the official Python image from the Docker Hub, based on Alpine Linux for a smaller footprint
FROM python:3.10-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the requirements.txt file from the host into the container at the working directory
COPY ./requirements.txt .

# Install the Python dependencies listed in requirements.txt
# The --no-cache-dir option prevents caching of the installed packages, which helps reduce the image size
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the contents of the local app directory to the /app directory in the container
COPY ./app app

# Set the default command to run the Uvicorn server to start the FastAPI application
# The --host 0.0.0.0 option makes the server accessible from outside the container
# The --port 8000 option sets the port for the server
# The --reload option enables auto-reloading of the server on code changes, useful for development
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

