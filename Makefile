# ============ Variables ============
front := frontend
back 	:= backend

root_label  := "[ root ]"
front_label := "[" $(front) "]"
back_label  := "[" $(back) "]"

# ============ Help ============
# More about makefile help: https://gist.github.com/prwhite/8168133

GREEN  := $(shell tput -Txterm setaf 2)
WHITE  := $(shell tput -Txterm setaf 7)
YELLOW := $(shell tput -Txterm setaf 3)
RESET  := $(shell tput -Txterm sgr0)

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
clean: clean_build_dir																					##@cleaning Removes all 'build/' directories (in root, backend and frontend)

clean_all: clean_build_dir clean_node_modules_dir								##@cleaning Same as clean + removes all node_modules directories

clean_build_dir:
	@echo $(root_label) "Removing build..."; rm -rf build
	@echo $(back_label) "Removing build..."; cd $(back); rm -rf build
	@echo $(front_label) "Removing build..."; cd $(front); rm -rf build

clean_node_modules_dir:
	@echo $(root_label) "Removing node_modules..."; rm -rf node_modules
	@echo $(back_label) "Removing node_modules..."; cd $(back); rm -rf node_modules
	@echo $(front_label) "Removing node_modules..."; cd $(front); rm -rf node_modules


# =========== Install ============
install:																												##@installation Install dependencies for root directory (yarn install)
	@echo "Installing dependencies..."; yarn install

postinstall: install_backend install_frontend										##@installation [auto triggered after install] Install dependencies for backend/ and frontend/ + copy .env files
	@cp .env.example .env
	@cp .env.example .env.production

install_backend:
	@echo $(back_label); cd $(back); yarn install

install_frontend:
	@echo $(front_label); cd $(front); yarn install

clean_install: clean_node_modules_dir install										##@installation Removes all node_modules directories and run install


# =========== Dev ============
dev:																														##@development Runs backend server and React's live server
	./node_modules/.bin/npm-run-all -lp dev:backend dev:frontend

dev_backend:																										##@development Runs backend server only
	@echo $(back_label); cd $(back); yarn dev

dev_frontend:																										##@development Runs React's live server only
	@echo $(front_label); cd $(front); yarn dev

# =========== Test & Lint============
test: test_frontend test_backend																##@testing Runs tests for frontend and backend

test_backend:																										##@testing Runs tests only for backend
	@echo $(back_label); cd $(back); yarn test

test_frontend:																									##@testing Runs tests only for frontend
	@echo $(front_label); cd $(front); yarn test

lint: lint_frontend lint_backend																##@other Runs eslint for frontend and backend

lint_backend:
	@echo $(back_label); cd $(back); yarn lint

lint_frontend:
	@echo $(front_label); cd $(front); yarn lint


# =========== Build ============
build: lint test clean_build_dir build_backend build_frontend		##@build Builds backend + frontend
	@cp -rf $(back)/build .
	@cp -rf $(front)/build/ ./build/public/
	@cp $(back)/package.json ./build/; cd build; yarn install --only=production
	node .tools/copyProdEnv.js

build_backend:
	@echo $(back_label); cd $(back); yarn build

build_frontend:
	@echo $(front_label); cd $(front); yarn build