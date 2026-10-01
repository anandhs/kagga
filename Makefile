SHELL := /bin/sh
.DEFAULT_GOAL := help

.PHONY: help dev build check new clean

help: ## Show available commands
	@awk 'BEGIN {FS = ":.*## "; printf "Kagga Bites commands\n\n"} /^[a-zA-Z_-]+:.*## / {printf "  %-12s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start Hugo with draft comics visible
	hugo server --buildDrafts --disableFastRender

build: ## Build the production site into public/
	hugo --cleanDestinationDir --minify

check: ## Validate the visual index and production site
	node scripts/check-visual-index.js
	hugo --cleanDestinationDir --panicOnWarning --minify

new: ## Create a comic draft; usage: make new VERSE=42
	@test -n "$(VERSE)" || (echo "Usage: make new VERSE=42" && exit 1)
	hugo new content "comics/kagga-$(VERSE).md"

clean: ## Remove generated Hugo output
	rm -rf public resources/_gen .hugo_build.lock

