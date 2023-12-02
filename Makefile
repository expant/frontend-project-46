install:
	npm ci

lint: 
	npx eslint .

lint-fix:
	npx eslint . --fix

gendiff:
	node ./index.js

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8