#!/bin/bash

docker build -t my-todo-app .


docker run -d --name my-todo-container -p 3000:3000 my-node-app
