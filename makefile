help:
	@echo -e "\033[0;33mPlease use \`make <target>\` where <target> is one of\033[0m\n"
	@echo -e "  \033[0;32mstart_dev                \033[0m Starts development container"
	@echo -e "  \033[0;32mstop_dev                 \033[0m Stops development container"
	@echo -e "  \033[0;32mstart_dev_build          \033[0m Rebuilds development container and starts it. Needed for adding new node_modules"
	@echo -e "  \033[0;32mstart_prod               \033[0m Starts the production container with the newest image. Requires that deploy did at least run 1 time."
	@echo -e "  \033[0;32mstop_prod                \033[0m Stops the production container"
	@echo -e "  \033[0;32mdeploy                   \033[0m Builds a new Production image. Than tries stops the production container. Than starts it again with the new image."

start_dev: stop_prod stop_dev
	@docker-compose -f ./docker/development/docker-compose.yml up -d

stop_dev:
	@docker-compose -f ./docker/development/docker-compose.yml stop

start_dev_build: stop_dev
	@docker-compose -f ./docker/development/docker-compose.yml up -d --build

start_prod: stop_dev stop_prod
	@docker-compose -f ./docker/production/docker-compose.yml up -d

stop_prod:
	@docker-compose -f ./docker/production/docker-compose.yml stop

build_prod:
	@(cd docker/production/ && bash buildImage.sh)

deploy: build_prod stop_prod start_prod
