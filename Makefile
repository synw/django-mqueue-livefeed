VENV_PATH=.venv
PYTHON_INTERPRETER=python3
PYTHON_BIN=$(VENV_PATH)/bin/python
PIP=$(VENV_PATH)/bin/pip
TWINE=$(VENV_PATH)/bin/twine
DJANGO_MANAGE=$(VENV_PATH)/bin/python sandbox/manage.py
FLAKE=$(VENV_PATH)/bin/flake8
BLACK=$(VENV_PATH)/bin/black
PYTEST=$(VENV_PATH)/bin/pytest
PYRIGTH=$(VENV_PATH)/bin/pyright
SPHINX_RELOAD=$(VENV_PATH)/bin/python sphinx_reload.py

DEMO_DJANGO_SECRET_KEY=samplesecretfordev
APPLICATION_NAME=livefeed
PACKAGE_SLUG=`echo $(APPLICATION_NAME) | tr '-' '_'`

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo
	@echo "  install             -- to install this project with virtualenv and Pip"
	@echo "  initdb              -- to initialize the database"
	@echo "  pushevents          -- to generate fake events for the demo"
	@echo
	@echo "  clean               -- to clean EVERYTHING (Warning)"
	@echo "  clean-var           -- to clean data (uploaded medias, database, etc..)"
	@echo "  clean-install       -- to clean Python side installation"
	@echo "  clean-pycache       -- to remove all __pycache__, this is recursive from current directory"
	@echo
	@echo "  run                 -- to run Django development server"
	@echo "  runws               -- to run the websockets server"
	@echo "  watchtw             -- to run the Tailwind watch autocompile"
	@echo "  buildtw             -- to run build Tailwind for production"
	@echo "  migrate             -- to apply demo database migrations"
	@echo "  migrations          -- to create new migrations for application after changes"
	@echo "  superuser           -- to create a superuser for Django admin"
	@echo
	@echo "  flake               -- to launch Flake8 checking"
	@echo "  test                -- to launch base test suite using Pytest"
	@echo "  test-initial        -- to launch tests with pytest and re-initialized database (for after new application or model changes)"
	@echo "  quality             -- to launch Flake8 checking and every tests suites"
	@echo "  codecheck           -- check the code quality with Pycheck"
	@echo

clean-pycache:
	@echo ""
	@echo "==== Clear Python cache ===="
	@echo ""
	rm -Rf .pytest_cache
	find . -type d -name "__pycache__"|xargs rm -Rf
	find . -name "*\.pyc"|xargs rm -f
.PHONY: clean-pycache

clean-install:
	@echo ""
	@echo "==== Clear installation ===="
	@echo ""
	rm -Rf $(VENV_PATH)
	rm -Rf $(PACKAGE_SLUG).egg-info
.PHONY: clean-install

clean-var:
	@echo ""
	@echo "==== Clear var/ directory ===="
	@echo ""
	rm -Rf var
.PHONY: clean-var

clean: clean-var clean-doc clean-install clean-pycache
.PHONY: clean

venv:
	@echo ""
	@echo "==== Install virtual environment ===="
	@echo ""
	virtualenv -p $(PYTHON_INTERPRETER) $(VENV_PATH)
	# This is required for those ones using old distribution
	$(PIP) install --upgrade pip
	$(PIP) install --upgrade setuptools
.PHONY: venv

create-var-dirs:
	@mkdir -p var/db
	@mkdir -p var/static/css
	@mkdir -p var/media
	@mkdir -p sandbox/media
	@mkdir -p sandbox/static/css
.PHONY: create-var-dirs

installws:
	@echo ""
	@echo "==== Installing the local websockets server ===="
	@echo ""
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) install
	@echo ""
	@echo " To run the demo:"
	@echo "  - run make runws in one terminal for the websockets server"
	@echo "  - run make run in another terminal for the http server"
	@echo ""
.PHONY: installws

install: venv create-var-dirs
	@echo ""
	@echo "==== Installing the backend ===="
	@echo ""
	$(PIP) install -e .[dev]
	rm -Rf $(PACKAGE_SLUG).egg-info
	${MAKE} migrate
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) tailwind install
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) tailwind build
	${MAKE} installws
	${MAKE} initdb
.PHONY: install

initdb:
	@echo ""
	@echo "==== Initializing database ===="
	@echo ""
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) init_db
	${MAKE} superuser
.PHONY: initdb

pushevents:
	@echo ""
	@echo "==== Generating events ===="
	@echo ""
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) feed_mq
.PHONY: pushevents

migrations:
	@echo ""
	@echo "==== Making application migrations ===="
	@echo ""
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) makemigrations $(APPLICATION_NAME)
.PHONY: migrations

migrate:
	@echo ""
	@echo "==== Apply pending migrations ===="
	@echo ""
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) migrate
.PHONY: migrate

superuser:
	@echo ""
	@echo "==== Create new superuser ===="
	@echo ""
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) createsuperuser
.PHONY: superuser

run:
	@echo ""
	@echo "==== Running development server ===="
	@echo ""
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) runserver 0.0.0.0:8000
.PHONY: run

runws:
	@echo ""
	@echo "==== Running the websockets server ===="
	@echo ""
	$(DJANGO_MANAGE) runws
.PHONY: runws

buildtw:
	@echo ""
	@echo "==== Building Tailwind for production ===="
	@echo ""
	$(DJANGO_MANAGE) tailwind build
.PHONY: buildtw

watchtw:
	@echo ""
	@echo "==== Running Tailwind watch autocompile ===="
	@echo ""
	$(DJANGO_MANAGE) tailwind start
.PHONY: watchtw

shell:
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) shell_plus
.PHONY: shell

check:
	@DJANGO_SECRET_KEY=$(DEMO_DJANGO_SECRET_KEY) \
	$(DJANGO_MANAGE) check
.PHONY: check

flake:
	@echo ""
	@echo "==== Flake ===="
	@echo ""
	$(FLAKE) --show-source $(APPLICATION_NAME)
	$(FLAKE) --show-source tests
.PHONY: flake

test:
	@echo ""
	@echo "==== Tests ===="
	@echo ""
	$(PYTEST) -vv --reuse-db tests/
	rm -Rf var/media-tests/
.PHONY: test

test-initial:
	@echo ""
	@echo "==== Tests from zero ===="
	@echo ""
	$(PYTEST) -vv --reuse-db --create-db tests/
	rm -Rf var/media-tests/
.PHONY: test-initial

quality: test-initial freeze-dependencies 
	@echo ""
	@echo "♥ ♥ Everything should be fine ♥ ♥"
	@echo ""
.PHONY: quality

format:
	$(BLACK) --extend-exclude='/*/migrations/*|setup.py' .
.PHONY: format

dryformat:
	$(BLACK) --extend-exclude='/*/migrations/*|setup.py' --check .
.PHONY: dryformat

codecheck:
	pycheck --django
.PHONY: codecheck
