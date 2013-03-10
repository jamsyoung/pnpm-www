# set environment variables
SHELL := /bin/bash
export XUNIT_FILE=junit.xml


# sent default make variables
reporter = spec


# set target specific variables
test-fun: reporter = nyan
test-report: reporter = xunit-file


# define targets
.PHONY: test test-run test-watch test-report clean complexity-report


test:
	@export COUCHDB_HOST=localhost; export COUCHDB_PORT=5984; ./node_modules/.bin/mocha -u tdd --reporter $(reporter) test/pal-env.test.js
	@./node_modules/.bin/mocha -u tdd --reporter $(reporter)


test-fun: test


test-watch:
	@./node_modules/.bin/mocha -u tdd --reporter $(reporter) --watch


test-report: clean
	@./node_modules/.bin/mocha -u tdd --reporter $(reporter)
	@echo "output written to $$XUNIT_FILE"


clean:
	rm -f junit.xml
