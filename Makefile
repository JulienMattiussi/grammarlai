help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install app locally
	yarn

start: ## Start the app locally
	yarn dev

start-prod: ## Start the app locally
	yarn start

build: ## Build the app for production
	yarn build


lint: ## Start the app locally
	yarn lint
