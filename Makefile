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
	@echo $(front_label); cd $(front); yarn start

# =========== Test ============
test: test_backend test_frontend

test_backend:
	@echo $(back_label); cd $(back); yarn test

test_frontend:
	@echo $(front_label); cd $(front); yarn test


# =========== Build ============
build:
	@echo "TODO: Update build script in makefile!"
#build: clean_build_dir build_backend build_frontend
#	@echo "TODO: Moving directories to proper build"
#
#build_backend:
#	@echo $(back_label); cd $(back); yarn build
#
#build_frontend:
#	@echo $(front_label); cd $(front); yarn build