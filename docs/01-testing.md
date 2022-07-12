# Testing

Check [Test documentation on Confluence](https://toptal-core.atlassian.net/wiki/spaces/SACQ/pages/2476737125/Testing+process+and+tools) for more detailed information about test automation levels and instructions.

## Unit tests

```bash
yarn test:unit
```

Check documentation about [Unit tests best practices](https://toptal-core.atlassian.net/wiki/spaces/SACQ/pages/2561835118/Unit+tests+best+practices) for more quality driven tests.

### Code coverage for unit tests

```bash
yarn test:unit:coverage
```

Open the link is shown on the terminal, click on right up side "%Coverage" and check it up.

## End-to-end tests

```bash
yarn test:e2e
```

Check documentation about [Playwright tests best practices](https://toptal-core.atlassian.net/wiki/spaces/SACQ/pages/2562032213/Playwright+best+practices) for more quality driven tests.

### Code coverage for end-to-end tests

```bash
yarn test:e2e:coverage
yarn nyc:report
```

Open html generated report on browser:

```bash
http://localhost:5500/test-coverage/e2e/index.html
```

## Generate combined coverage report

You can run manually [coverage workflow through GitHub Actions](https://github.com/toptal/site-acq-project-template/actions/workflows/coverage.yml)

```bash
mkdir test-coverage-all
mv test-coverage/unit/jest-unit-coverage-report/coverage-final.json test-coverage/e2e/coverage-final-unit.json
find test-coverage -type f -name '*.json' -exec cp {} test-coverage-all ';'
mkdir -p test-coverage/temp
yarn nyc merge test-coverage-all test-coverage/temp/coverage-final.json
yarn nyc report --temp-dir test-coverage/temp --reporter html --report-dir test-coverage/coverage-report-all
```

## Visual regression tests

### Happo settings

Go to LastPass and get Happo login credentials, so you can access the dashboard from our account. If don’t have the credentials, reach out to IT Ops channel on Slack.

Add to your global environment variables:

```
HAPPO_API_KEY=XXX
HAPPO_API_SECRET=XXX
```

### Running Happo tests

```bash
yarn install && yarn build
yarn happo run
```

You can compare runs between two commit hashes with:

```bash
yarn happo compare first-commit-hash second-commit-hash
```

You can run by test component with:

```bash
yarn happo run --only component-name
```

Check documentation about [Happo tests best practices](https://toptal-core.atlassian.net/wiki/spaces/SACQ/pages/2561933682/Happo+tests+best+practices) for more quality driven tests.

### Accessibility tests

Basic A11y tests are in place at `test/e2e/a11y.e2e.test.ts`

Make sure to keep it up to date, covering any new pages, dialogs, collapsable menus, etc.
