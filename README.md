# deploy-tracker

> a GitHub App built with [Probot](https://github.com/probot/probot) that labels pull requests with a label for the environment that it has been deployed to.

This app was originally created as a demo; you can see the "demo" code, with lots of comments and no functionality, in `index.js`. To see a completed version of the app, check out `completed.js`!

## Setup

To run this app, you'll need to [register a GitHub App](https://probot.github.io/docs/development/#configure-a-github-app) and set up your environment variables.

The GitHub App requires the following permissions:

* **Deployments**: Read-Only
* **Issues**: Read-Only
* **Pull Requests**: Read & Write
* **Single file**: Read-Only, `.github/deploy-tracker.yml`

Then, clone the repo and run these commands:

```
# Install dependencies
npm install

# Run the bot
npm start
```
