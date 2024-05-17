### formation-docker

## Level 1

The goal in this level is to pull an image from a distance registery and understanding the principe of images and container.

Docker Hub is a cloud-based registry service provided by Docker that allows users to store and share Docker container images. It serves as a centralized repository for Docker images, providing a platform for developers to publish and distribute their containerized applications.

Images are the beginning of every containerized app it allow you to start up applications.

To understand this more deeply let pull an image of a db.

```docker
docker pull postgres:15-alpine
```

To see all your images localy you can use the folowing command

```docker
docker images
```

now that you have download this image you can start a container from this image to du so you ca use the command docker run

```docker
docker run --name db-container -p 5436:5432 -d -e POSTGRES_PASSWORD=password postgres:15-alpine
```

this command take multiple flags (params) :

- --name : give a name to the container
- -p : mock a localport to a container port \<local_port>:\<container_port>
- -d : allow you to run the container in detached mode (give you the terminal back)
- -e : allow you to pass env varibale to the container (great for configuration)

here some important flag you ofter use. you can find more option on the official documentation [docker run ](https://docs.docker.com/reference/cli/docker/container/run/)

docker run [params] <image_name>

without installing postgres on our machine we have a postgres db running localy thanks to docker. here one way of using docker localy really easy to run db instance and of course you can use every db image you want (eg. mongodb, mysql, mariadb ...) just go to docker hub and explore official images.

to see running containers you can use :

```docker
docker ps
```

to see all container :

```
docker ps -a
```

with this command you can acces the bash of the container (it can depends on wich image you are based refer to image docs if needed) :

```docker
docker exec -it <container-name> bash
```

- -it : interactive mode

demo command:

```bash
env | grep POST     #list env
psql -U postgres    #access postgress database

# soms sql for demo
create table users(name varchar(50));
insert into users values('Anto');
select * from users;

\dt  #list table in db
```

Here som usefull command to manage your containers and images:

Stop a container :

```docker
docker stop <container-name>
```

Remove a container :

```
docker container rm <container-name> --force
```

- --force : allow you to force remove a running container

List images:

```docker
docker images
```

Remove an image :

```docker
docker image rm <image-name>:<tag>
```

On big advantage of using docker is that we can run multiple container from the same images. in server context running multiple instance is a huge crux. and docker allow us to do so so easely.
