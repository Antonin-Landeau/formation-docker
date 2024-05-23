# Formation docker LEVEL 2

## Backend

In this level we will see how we can create our own image from an image of Dockerhub

We will take the context of a fullstack application that use a python backend and a REACT frontend so we can i can illustrate docker image in tow different context.

```bash
cd backend
```

### Build the image

```docker
docker build -t docker-formation-backend .
```

### Run the container from the build image

```docker
docker run --name fast-api-demo -d -p 8000:8000 docker-formation-backend
```

Well donne we just run an api in a docker container in local

demo: Show that we cant see changes in real time.

to see the changes we need to rebuild the image an rerun the container because we copy the code in the dockerfile

### Docker volumes

To make development with docker we can use volumes to crete a bridgs between a folder of the local machine and the container. it will detect changes in the specified folder and change it in the linked folder in the container.

The -v flag allows you to share a directory between the host and the container. In this case, the directory /home/antonin/Documents/code/formation/formation-docker/backend on the host machine is mounted to /app inside the container. This means that any changes you make to the files in the host directory will be reflected in the container and vice versa.
Volumes are attached to a container in the run command.

```docker
docker run --name fastapi-demo -p 8000:8000 -d -v /home/antonin/Documents/code/formation/formation-docker/backend:/app docker-formation-backend
```

## Frontend

from root

So for the frontend we can do the same but we will build the image wither an other dockerfile but.

Dockerfiles are like recipe that tell docker what to do when it runs a container.

```bash
cd frontend
```

```docker
docker build -t docker-formation-frontend .
```

```docker
docker run --name react-demo -p 5173:5173 -d -e VITE_BACKEND_URL=http://localhost:8000 -v /home/antonin/Documents/code/formation/formation-docker/frontend/src:/app/src docker-formation-frontend
```
