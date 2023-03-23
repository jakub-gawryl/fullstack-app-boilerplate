# ============ Variables ============
GREEN   := $(shell tput -Txterm setaf 2)
YELLOW  := $(shell tput -Txterm setaf 3)
BLUE    := $(shell tput -Txterm setaf 4)
MAGENTA := $(shell tput -Txterm setaf 5)
CYAN    := $(shell tput -Txterm setaf 6)
WHITE   := $(shell tput -Txterm setaf 7)
RESET   := $(shell tput -Txterm sgr0)

front := frontend
back 	:= backend

ROOT_LABEL  := "${BLUE}[ *** root *** ]${RESET}"
FRONT_LABEL := "${CYAN}[ ***" $(front) "*** ]${RESET}"
BACK_LABEL  := "${MAGENTA}[ ***" $(back) "*** ]${RESET}"

# ============ Help ============
# More about makefile help: https://gist.github.com/prwhite/8168133

HELP_FUN = \
	%help; \
	while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\_]+)\s*:.*\#\#(?:@([a-zA-Z\-]+))?\s(.*)$$/ }; \
	print "usage: ${GREEN}make <command>${RESET}\n\n"; \
	print "available commands:\n\n"; \
	for (sort keys %help) { \
	print "${WHITE}$$_:${RESET}\n"; \
	for (@{$$help{$$_}}) { \
	$$sep = " " x (32 - length $$_->[0]); \
	print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
	}; \
	print "\n"; }

help: 																													##@other Show this help.
	@perl -e '$(HELP_FUN)' $(MAKEFILE_LIST)


# ============ Clean ============
clean: clean-build-dir																					##@cleaning Removes all 'build/' directories (in root, backend and frontend)

clean-all: clean-build-dir clean-node-modules-dir								##@cleaning Same as clean + removes all node_modules directories

clean-build-dir:
	@echo $(ROOT_LABEL) "Removing build..."; rm -rf build
	@echo $(BACK_LABEL) "Removing build..."; cd $(back); rm -rf build
	@echo $(FRONT_LABEL) "Removing build..."; cd $(front); rm -rf build

clean-node-modules-dir:
	@echo $(ROOT_LABEL) "Removing node_modules..."; rm -rf node_modules
	@echo $(BACK_LABEL) "Removing node_modules..."; cd $(back); rm -rf node_modules
	@echo $(FRONT_LABEL) "Removing node_modules..."; cd $(front); rm -rf node_modules


# =========== Install ============
install:																												##@installation Install dependencies for root directory (yarn install)
	@echo $(ROOT_LABEL); yarn install

postinstall: install-backend install-frontend										##@installation [auto triggered after install] Install dependencies for backend/ and frontend/ + copy .env files
	@cp .env.example .env
	@cp .env.example .env.production

install-backend:
	@echo $(BACK_LABEL); cd $(back); yarn install

install-frontend:
	@echo $(FRONT_LABEL); cd $(front); yarn install

clean_install: clean-node-modules-dir install										##@installation Removes all node_modules directories and run install


# =========== Dev ============
dev:																														##@development Runs backend server and React's live server
	./node_modules/.bin/npm-run-all -lp dev:backend dev:frontend

dev-backend:																										##@development Runs backend server only
	@echo $(BACK_LABEL); cd $(back); yarn dev

dev-frontend:																										##@development Runs React's live server only
	@echo $(FRONT_LABEL); cd $(front); yarn dev

# =========== Test & Lint============
test: test-frontend test-backend																##@testing Runs tests for frontend and backend

test-backend:																										##@testing Runs tests only for backend
	@echo $(BACK_LABEL); cd $(back); yarn test

test-frontend:																									##@testing Runs tests only for frontend
	@echo $(FRONT_LABEL); cd $(front); yarn test

lint: lint-frontend lint-backend																##@other Runs eslint for frontend and backend

lint-backend:
	@echo $(BACK_LABEL); cd $(back); yarn lint

lint-frontend:
	@echo $(FRONT_LABEL); cd $(front); yarn lint


# =========== Build ============
build: lint test clean-build-dir build-backend build-frontend		##@build Builds backend + frontend
	@cp -rf $(back)/build .
	@cp -rf $(front)/build/ ./build/public/
	@cp $(back)/package.json ./build/; cd build; yarn install --only=production
	node .tools/copyProdEnv.js

build-backend:
	@echo $(BACK_LABEL); cd $(back); yarn build

build-frontend:
	@echo $(FRONT_LABEL); cd $(front); yarn build