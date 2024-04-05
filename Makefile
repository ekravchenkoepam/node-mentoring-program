run:
	npm start

task1: 
	npm run task1

task2: 
	npm run task2

task3: 
	npm run task3

run-build:
    podman build -t node-mentoring-program .

run-create:
    podman network create app_network

run-db:
	podman run --name mongodb -p 27017:27017 -d --network=app_network mongo

run-app:
	podman run --name node-mentoring-program -p 8000:8000 -d --network=app_network node-mentoring-program

run-ps:
	podman ps -a