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

.PHONY: cleanCoverageOut
cleanCoverageOut:
	@$(RM) -r ${ENV_COVERAGE_OUT_FOLDER}
	$(info ~> has cleaned ${ENV_COVERAGE_OUT_FOLDER})

.PHONY: cleanNpmCache
cleanNpmCache:
	@$(RM) -r ${ENV_NODE_MODULES_FOLDER}
	$(info ~> has cleaned ${ENV_NODE_MODULES_FOLDER})
	@$(RM) ${ENV_NODE_MODULES_LOCK_FILE}
	$(info ~> has cleaned ${ENV_NODE_MODULES_LOCK_FILE})

.PHONY: cleanAll
cleanAll: cleanCoverageOut cleanNpmCache
	@echo "=> clean all finish"

.PHONY: installUtils
installUtils:
	node -v
	npm -v
	npm install -g commitizen cz-conventional-changelog conventional-changelog-cli npm-check-updates standard-version

versionHelp:
	@git fetch --tags
	@echo "project base info"
	@echo " project name         : ${ROOT_NAME}"
	@echo " module folder path   : ${ENV_MODULE_FOLDER}"
	@echo ""
	@echo "=> please check to change version, now is [ ${ENV_DIST_VERSION} ]"
	@echo "-> check at: ${ENV_MODULE_MANIFEST}:3"

tagBefore: versionHelp
	@cd ${ENV_MODULE_FOLDER} && conventional-changelog -i ${ENV_MODULE_CHANGELOG} -s --skip-unstable
	@echo ""
	@echo "=> new CHANGELOG.md at: ${ENV_MODULE_CHANGELOG}"
	@echo "place check all file, then can add tag like this!"
	@echo "$$ git tag -a '${ENV_DIST_VERSION}' -m 'message for this tag'"

.PHONY: installGlobal
installGlobal:
	npm install --global rimraf

.PHONY: install
install:
	npm install

.PHONY: installAll
installAll: installUtils installGlobal install
	@echo "=> install all finish"

.PHONY: depPrune
depPrune:
	npm prune

.PHONY: depGraph
depGraph:
	npm list -l

.PHONY: dep
dep:
	npm install
	npm run clean:lockfile

.PHONY: depReInstall
depReInstall: cleanNpmCache dep

.PHONY: upCheckUpgrade
upCheckUpgrade:
	npx npm-check-updates

.PHONY: upDoNpmCheckUpgrade
upDoNpmCheckUpgrade:
	npx npm-check-updates --doctor -u
	npm install

.PHONY: upNoInteractive
upNoInteractive: upCheckUpgrade upDoNpmCheckUpgrade

.PHONY: up
up:
	npx npm-check-updates --interactive --doctor --format group

.PHONY: lintEslint
lintEslint:
	npm run lint:eslint

.PHONY: lintEslintNoWarning
lintEslintNoWarning:
	npm run lint:eslintNoWarning

.PHONY: test
test:
	npm test

.PHONY: testCoverage
testCoverage: cleanCoverageOut
	npm run jest:collectCoverage

.PHONY: testCICoverage
testCICoverage: cleanCoverageOut
	npm run jest:coverage
	codecov

.PHONY: testAll
testAll:
	npm run test

.PHONY: style
style:
	npm run format

.PHONY: buildIfPresent
buildIfPresent:
	npm ci
	npm run build --if-present

.PHONY: ci
ci: lintEslint test buildIfPresent devHelp

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
	@echo " tips: can install node and install installUtils, not required"
	@echo "$$ make installUtils        ~> npm install git cz"
	@echo "$$ make installGlobal       ~> install tools at global, not required"
	@echo "$$ make installAll          ~> install all include global utils and node_module"
	@echo "  1. then write git commit log, can replace [ git commit -m ] to [ git cz ]"
	@echo "  2. generate CHANGELOG.md doc: https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility"
	@echo ""
	@echo "  then you can generate CHANGELOG.md as"
	@echo "$$ make versionHelp         ~> print version when make tageBefore will print again"
	@echo "$$ make tagBefore           ~> generate CHANGELOG.md and copy to module folder"
	@echo ""
	@echo ""
	@echo " project name         : ${ROOT_NAME}"
	@echo " module folder path   : ${ENV_MODULE_FOLDER}"
	@echo ""
	@echo "$$ make dep                 ~> install local"
	@echo "$$ make depPrune            ~> prune node_modules"
	@echo "$$ make depGraph            ~> show dep graph"
	@echo "$$ make depReInstall        ~> clean node_modules and install again"
	@echo "$$ make upCheckUpgrade      ~> check upgrade not do upgrade"
	@echo "$$ make upNoInteractive     ~> check and upgrade all module no interactive"
	@echo "$$ make up                  ~> upgrade interactive and try test"
	@echo ""
	@echo " unit test as"
	@echo "$$ make test                ~> only run unit test as change"
	@echo "$$ make testAll             ~> run full unit test"
	@echo "$$ make testCoverage        ~> run full unit test and show coverage"
	@echo "$$ make testCICoverage      ~> run full unit test CI coverage"
	@echo ""
	@echo "$$ make style               ~> run style check and auto fix"
	@echo "$$ make lintEslint          ~> run eslint check"
	@echo "$$ make lintEslintNoWarning ~> run eslint check no warning and fix"
	@echo "$$ make ci                  ~> run ci"

.PHONY: devHelp
devHelp:
	npm run cli:help

.PHONY: help
help: helpProjectRoot
	@echo ""
	@echo "-- more info see Makefile --"
	@echo ""
	@echo "$$ make devHelp             ~> show cli help"