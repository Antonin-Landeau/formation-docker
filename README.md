# Formation docker LEVEL 2

## Backend

In this section, we will see how to create our own image from an image on Docker Hub.

We will use the context of a full-stack application with a Python backend and a React frontend to illustrate Docker images in two different contexts.

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

The -v flag allows you to share a directory between the host and the container. In this case, the directory /home/antonin/Documents/code/formation/formation-docker/backend on the host machine is mounted to /app inside the container. This means that any changes you make to the files in the host directory will be reflected in the container and vice versa.

It is perfect to see changes in real time in develoment.

Volumes are attached to a container in the run command.

```docker
docker run --name fastapi-demo -p 8000:8000 -d -v /home/antonin/Documents/code/formation/formation-docker/backend:/app docker-formation-backend
```

## Frontend

So for the frontend we can do the same but we will build the image with an other dockerfile.

Dockerfiles are like recipes that tell Docker what to do when it builds and runs a container. Just like a recipe in cooking, a Dockerfile includes a list of ingredients and a set of instructions to create the final dish.

```bash
cd frontend
```

### Build the image

```docker
docker build -t docker-formation-frontend .
```

### Run the container from the build image

```docker
docker run --name react-demo -p 5173:5173 -d -e VITE_BACKEND_URL=http://localhost:8000 -v /home/antonin/Documents/code/formation/formation-docker/frontend/src:/app/src docker-formation-frontend
```

## Conclusion

We packaged two applications from two different base images (Node.js and Python):

We specified some actions to perform during the build to match our needs, but for more complex applications, we can do much more, such as:

- Specifying environment variables at build time
- Creating users and groups
- Running scripts
- Creating a multi-stage Dockerfile to create intermediate images during the build

For more advanced usage, refer to the [documentation on multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/).
