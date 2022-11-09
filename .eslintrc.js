module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-dirtyhenry`
  extends: ["dirtyhenry"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
