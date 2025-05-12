# change base namespace
ROOT_NAME =node-cli-temple

ENV_ROOT ?=$(shell pwd)
ENV_MODULE_FOLDER ?=${ENV_ROOT}
ENV_MODULE_MAKE_FILE ?=${ENV_MODULE_FOLDER}/Makefile
ENV_MODULE_MANIFEST =${ENV_MODULE_FOLDER}/package.json
ENV_MODULE_CHANGELOG =${ENV_MODULE_FOLDER}/CHANGELOG.md
ENV_COVERAGE_OUT_FOLDER =${ENV_ROOT}/coverage
ENV_NODE_MODULES_FOLDER =${ENV_ROOT}/node_modules
ENV_NODE_MODULES_LOCK_FILE =${ENV_ROOT}/package-lock.json
ENV_ROOT_CHANGELOG_PATH?=CHANGELOG.md

.PHONY: all
all: env

.PHONY: env
env:
	@echo "== project env info start =="
	@echo ""
	@echo "ROOT_NAME                                 ${ROOT_NAME}"
	@echo "ENV_MODULE_FOLDER                         ${ENV_MODULE_FOLDER}"
	@echo "ENV_ROOT_CHANGELOG_PATH                   ${ENV_ROOT_CHANGELOG_PATH}"
	@echo ""
	@echo "test info"
	@echo "ENV_COVERAGE_OUT_FOLDER                   ${ENV_COVERAGE_OUT_FOLDER}"
	@echo "== project env info end =="

.PHONY: clean.coverage.out
clean.coverage.out:
	@$(RM) -r ${ENV_COVERAGE_OUT_FOLDER}
	$(info ~> has cleaned ${ENV_COVERAGE_OUT_FOLDER})

.PHONY: clean.npm.cache
clean.npm.cache:
	@$(RM) -r ${ENV_NODE_MODULES_FOLDER}
	$(info ~> has cleaned ${ENV_NODE_MODULES_FOLDER})
	@$(RM) ${ENV_NODE_MODULES_LOCK_FILE}
	$(info ~> has cleaned ${ENV_NODE_MODULES_LOCK_FILE})

.PHONY: clean.all
clean.all: clean.coverage.out clean.npm.cache
	@echo "=> clean all finish"

.PHONY: install
install:
	npm install

.PHONY: dep.prune
dep.prune:
	npm prune

.PHONY: dep.graph
dep.graph:
	npm list -l

.PHONY: dep
dep:
	npm install
	npm run clean:lockfile

.PHONY: dep.reinstall
dep.reinstall: clean.npm.cache dep

.PHONY: up.check.upgrade
up.check.upgrade:
	npx npm-check-updates

.PHONY: up.do.npm.check.upgrade
up.do.npm.check.upgrade:
	npx npm-check-updates -u --doctor
	npm install

.PHONY: upNoInteractive
upNoInteractive: up.check.upgrade up.do.npm.check.upgrade

.PHONY: up
up:
	npx npm-check-updates --interactive --format group --doctor

.PHONY: lint.eslint
lint.eslint:
	npm run lint:eslint

.PHONY: lint.eslint.no.warning
lint.eslint.no.warning:
	npm run lint:eslintNoWarning

.PHONY: lint
lint:
	pnpm run lint

.PHONY: test.coverage
test.coverage: clean.coverage.out
	npm run jest:collectCoverage

.PHONY: test.ci.coverage
test.ci.coverage: clean.coverage.out
	npm run jest:coverage
	codecov

.PHONY: test
test:
	npm test

.PHONY: testAll
testAll:
	npm run test

.PHONY: style
style:
	npm run format

.PHONY: build.if.present
build.if.present:
	npm ci
	npm run build --if-present

.PHONY: dev.help
dev.help:
	npm run cli:help

.PHONY: ci
ci: lint test build.if.present dev.help

.PHONY: helpProjectRoot
helpProjectRoot:
	@echo "Help: Project root Makefile"
ifeq ($(OS),Windows_NT)
	@echo ""
	@echo "warning: other install make cli tools has bug"
	@echo " run will at make tools version 4.+"
	@echo "windows use this kit must install tools blow:"
	@echo "-> scoop install main/make"
	@echo ""
endif
	@echo "node module makefile template"
	@echo ""
	@echo " project name                    : ${ROOT_NAME}"
	@echo " module folder path              : ${ENV_MODULE_FOLDER}"
	@echo ""
	@echo "$$ make dep                      ~> install local"
	@echo "$$ make dep.prune                ~> prune node_modules"
	@echo "$$ make dep.graph                ~> show dep graph"
	@echo "$$ make dep.reinstall            ~> clean node_modules and install again"
	@echo "$$ make up.check.upgrade         ~> check upgrade not do upgrade"
	@echo "$$ make upNoInteractive          ~> check and upgrade all module no interactive"
	@echo "$$ make up                       ~> upgrade interactive and try test"
	@echo ""
	@echo " unit test as"
	@echo "$$ make test                     ~> only run unit test as change"
	@echo "$$ make testAll                  ~> run full unit test"
	@echo "$$ make test.coverage            ~> run full unit test and show coverage"
	@echo "$$ make test.ci.coverage         ~> run full unit test CI coverage"
	@echo ""
	@echo "$$ make style                    ~> run style check and auto fix"
	@echo "$$ make lint.eslint              ~> run eslint check"
	@echo "$$ make lint.eslint.no.warning   ~> run eslint check no warning and fix"
	@echo "$$ make ci                       ~> run ci"

.PHONY: help
help: helpProjectRoot
	@echo ""
	@echo "-- more info see Makefile --"
	@echo ""
	@echo "$$ make dev.help                 ~> show cli help"