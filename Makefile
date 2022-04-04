install:
	yarn install

typecheck:
	yarn typecheck

transpile:
	yarn transpile

build:
	yarn typecheck
	yarn transpile
	@echo "🧱 are ready."
