install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon bin/slack.js

start-frontend:
	npx webpack serve --config webpack.dev.cjs

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext ts,tsx

publish:
	npm publish

deploy:
	git push heroku

test:
	npm test -s

.PHONY: test
