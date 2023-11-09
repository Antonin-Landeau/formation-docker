

CREATE TABLE commands (
  id SERIAL,
  name varchar(100),
  description varchar(200),
  command varchar(100),
  comment varchar(100)
);


INSERT INTO commands(name,description,command,comment) VALUES (
  'Downlod an image',  'Allow you to download image from distance repository', 'docker pull <name-image>', ''
);

INSERT INTO commands(name,description,command,comment) VALUES (
  'Create a container',  'Create a container from an image', 'docker build --name <container-name> -d -p <local-port>:<container-port> <image-name>', ''
);