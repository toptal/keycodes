# New project set-up

In order to set-up a repository for a new project, you should perform the following steps:

## GitHub configuration

- Create a repository from this template by clicking the button **'Use this template'**. The new repository should be named using this pattern: `labs-[project-name]`
- Make sure only `@toptal/site-acquisition-eng` is listed as Codeowner at `.github/CODEOWNERS`
- Add necessary members to the repository in `settings/Manage access`
  - @site-acquisition-eng, @infrastructure-eng - admin
  - @engineering, @secops, @fstoptal, @traffic-acquisition-eng, @toptal/bots - write
- Go to `settings/Branches/Branch protection rule/Add new rule`. Add following rules to `master` branch.
  - `Require pull request reviews before merging` - 2 reviewers and `Require review from Code Owners`
  - `Require status checks to pass before merging` and `Require branches to be up to date before merging`
  - `Require conversation resolution before merging`
  - `Require linear history`
  - `Allow force pushes`
- Add `HAPPO_API_KEY` and `HAPPO_API_SECRET` to `settings/secrets/New Repository Secret`. You can find these secrets in your LastPass vault
- Add `HAPPO_PROJECT_NAME` to `settings/secrets/New Repository Secret`. The value should be the project name.
- Add [Happo GitHub App](https://github.com/apps/happo) to the repository
- Ask CI Infra team on `#-ci-infrastructure-help` to add the following shared secrets to the repository:
  - `TOPTAL_DEVBOT_TOKEN`
  - `ANVIL_BASIC_AUTH`
  - `GCR_ACCOUNT_KEY`
  - `NPM_TOKEN_READ_ONLY`
  - `TOPTAL_BOT_JENKINS_API_TOKEN`
  - `TOPTAL_BUILD_BOT_SSH_KEY`
  - `SLACK_BOT_TOKEN`

## Happo settings

Go to LastPass and get Happo login credentials, so you can access the dashboard from our account. If you have any problems, reach out to IT Ops.

- Go to [GitHub Integration](https://happo.io/a/431/github-integration) in Happo platform and activate the integration for your new repository
- Go to [Projects](https://happo.io/a/431/projects) in Happo platform and add a new project, setting its `Github repo` field to be the new repository

## Code adjustments

In your new repo, update the following files with your project name:

- `values.yaml`
  - `ingressRoute.host`
- `README.md` - replace Site Acquisition Project Template occurences
- `package.json` - `name`
- `.sandbox.env` - `NAME` and `NAMESPACE`
- `.github/workflows/happo.yml` - uncomment `HAPPO_PROJECT_NAME` environment variable
- `.github/pull_request_template.md` - fix links
- `lib/constants/common.ts`

set values for OpenGraph integration in `lib/constants/common.ts`:

- `PROJECT_DISPLAY_NAME` - project title
- `PROJECT_URL` - production url
- `PROJECT_DESCRIPTION` - meta/og:description
- `TWITTER_HANDLE`
- `OG_TITLE` - og:title
- `OG_IMAGE_URL` - public facing og image - `public/og-image.png` by default

and replace `public/og-image.png` with project opengraph image

## GithubBot setup

To enable some of the common PR checks you need to follow the instructions [here](https://github.com/toptal/github-bot#adding-a-new-repo-or-a-new-consumer-to-a-repo). After adding webhooks to the new repository create a new PR with [similar content](https://github.com/toptal/github-bot/pull/186). After creating the PR ping someone in [#-cia-core slack channel](https://toptal-core.slack.com/archives/C0HTNL2KA) for PR approval and GithubBot deployment

## Slack bullhorn setup

Subscribe to the new repository in our [bullhorn channel](https://toptal-core.slack.com/archives/C028TV4MCSK) by executing `/github subscribe toptal/labs-${project-name}`

## Sandbox Google oAuth

Go to `#-infrastructure-help ` and ask them to whitelist the sandbox URL (`ingressRoute.host` at `values.yaml`) for google authentication.

`Hey @infrastructure_team I’d like to enable google auth for [PROJECT NAME] sandbox as well. Can you please add https://[ingressRoute.host].toptal.rocks to the allowed URLs?`

## Anvil reporting setup

Enable anvil webhook by following these instructions: https://toptal-core.atlassian.net/wiki/spaces/BLACK/pages/1627816771/Setting+up+Anvil+in+a+project
