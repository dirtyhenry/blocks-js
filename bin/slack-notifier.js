#!/usr/bin/env node

// Example: [{"name": "@xx/xx", "version": "1.2.0"}, {"name": "@xx/xy", "version": "0.8.9"}]
// 📜 https://github.com/changesets/action
const publishedPackagesJSON = process.argv[process.argv.length - 1];
const publishedPackages = JSON.parse(publishedPackagesJSON);

const list = publishedPackages
  .map((p) => `• ${p.name}: ${p.version}`)
  .join("\n");

const message = {
  text: `🚀 Published:\n${list}`,
};

fetch(process.env.SLACK_NOTIFIER_WEBHOOK, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(message),
})
  .then((response) => {
    if (response.status >= 400) {
      console.error(`Status: ${response.status} ${response.statusText}`);
    } else {
      console.log(`Status: ${response.status}`);
    }
  })
  .catch((error) => {
    console.error(error);
  });
