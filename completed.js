// This is the completed version of the app. For a better documented
// look at how the app works, check out `index.js` of this repo!

const defaultConfig = {
  prefix: '⬆️ ',
  environments: {},
  defaultColor: '6f42c1'
}

module.exports = robot => {
  robot.on('deployment', async context => {
    const { environment, sha, description } = context.payload.deployment
    const { owner, repo } = context.repo()

    // Get config file from `.github/deploy-tracker.yml`
    const config = await context.config('deploy-tracker.yml', defaultConfig)

    // Put together label name
    const label = config.prefix + environment

    // Only trigger on Heroku deployments
    if (description !== 'Heroku') return

    // Search for all PRs that have a commit by this sha
    const prSearch = await context.github.search.issues({
      q: sha + `is:pr repo:${owner}/${repo}`
    })

    // If there aren't any, exit
    if (prSearch.data.total_count === 0) return

    // Get the PR number
    const pr = prSearch.data.items.find(p => p.state === 'open').number

    try {
      // Create the label
      await context.github.issues.createLabel(context.repo({
        color: config.environments[environment] || config.defaultColor,
        name: label
      }))
    } catch (e) {
      // Label already exists! GitHub API
      // will return an error, so we have
      // to catch it or the app will exit.
    }

    // Remove label from existing PR
    const search = await context.github.search.issues({ q: `is:pr repo:${owner}/${repo} label:"${label}"` })
    context.log(search)
    if (search.data.total_count !== 0) {
      const existingPR = search.data.items[0]

      // Don't remove/add from the same PR
      if (existingPR.number === pr) {
        return
      }

      // Remove the label
      context.log(`Removing [${label}] from #${existingPR.number}`)
      await context.github.issues.removeLabel(context.repo({
        number: existingPR.number,
        name: label
      }))
    }

    // Add the label 🎉
    context.log(`Adding [${label}] to #${pr}`)
    return context.github.issues.addLabels(context.repo({
      number: pr,
      labels: [label]
    }))
  })
}
