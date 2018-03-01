const defaultConfig = {
  prefix: '⬆️',
  environments: {},
  defaultColor: '6f42c1'
}

module.exports = robot => {
  robot.on('deployment', async context => {
    /**
     * 1. Get config file from the repo.
     * context.config()
     */

    /**
     * 2. Assemble the PR label based on the deployed environment
     * and the settings in the repo's config file.
     */

    /**
     * 3. Determine which PR this deployment relates to.
     * The deployment payload only knows which commit (by sha) has been
     * deployed, not the pull request or branch.
     *
     * The pull request must be open (not closed or merged).
     *
     * If there are no pull requests with this commit, don't continue
     */

    /**
     * 4. Remove the label from whichever PR has it currently.
     * Note: Don't remove the label if we're just going to add it again.
     */

    /**
     * 5. Create the label on GitHub
     * We have to do this on every deployment in case a new environment
     * is being used, or in case the config file has changed.
     *
     * If it already exists, the GitHub API will return an error.
     */

    /**
     * 6. Add the label to the pull request 🎉
     *
     * Profit!
     */
  })
}
