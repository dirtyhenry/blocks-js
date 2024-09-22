build:
	yarn run include-sass
	yarn run convert
	yarn run minify

run:
	yarn run dev-sass

playground:
	yarn run dev-html

clean:
	rm -rf .sass-cache/
	rm -rf .turbo/
	rm -rf dist/
	rm -rf node_modules/

.PHONY: build playground
