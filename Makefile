# ============ Variables ============
front := frontend
back := backend

root_label := "[ root ]"
front_label := "[" $(front) "]"
back_label := "[" $(back) "]"


# ============ Clean ============
clean: clean_build_dir

clean_all: clean_build_dir clean_node_modules_dir

clean_build_dir:
	@echo $(root_label) "Removing build..."; rm -rf build
	@echo $(back_label) "Removing build..."; cd $(back); rm -rf build
	@echo $(front_label) "Removing build..."; cd $(front); rm -rf build

clean_node_modules_dir:
	@echo $(root_label) "Removing node_modules..."; rm -rf node_modules
	@echo $(back_label) "Removing node_modules..."; cd $(back); rm -rf node_modules
	@echo $(front_label) "Removing node_modules..."; cd $(front); rm -rf node_modules


# =========== Install ============
install:
	@echo "Installing dependencies..."; yarn install

postinstall: install_backend install_frontend

install_backend:
	@echo $(back_label); cd $(back); yarn install

install_frontend:
	@echo $(front_label); cd $(front); yarn install

clean_install: clean_node_modules_dir install


# =========== Dev ============
dev:
	./node_modules/.bin/npm-run-all -lp dev:backend dev:frontend

dev_backend:
	@echo $(back_label); cd $(back); yarn dev

dev_frontend:
	@echo $(front_label); cd $(front); yarn dev

# =========== Test & Lint============
test: test_frontend test_backend

test_backend:
	@echo $(back_label); cd $(back); yarn test

test_frontend:
	@echo $(front_label); cd $(front); yarn test

lint: lint_frontend lint_backend

lint_backend:
	@echo $(back_label); cd $(back); yarn lint

lint_frontend:
	@echo $(front_label); cd $(front); yarn lint


# =========== Build ============
build: lint test clean_build_dir build_backend build_frontend
	@cp -rf $(back)/build .
	@cp -rf $(front)/build/ ./build/public/
	@cp $(back)/package.json ./build/; cd build; yarn install --only=production
	@cp .env.example build/.env

build_backend:
	@echo $(back_label); cd $(back); yarn build

build_frontend:
	@echo $(front_label); cd $(front); yarn build