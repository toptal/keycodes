# Testing

## Unit tests

```bash
yarn test:unit
```

### Code coverage for unit tests

```bash
yarn test:unit:coverage
```

Open the link is shown on the terminal, click on right up side "%Coverage" and check it.

## End-to-end tests

End-to-end tests are created using Playwright. To run the tests:

```bash
yarn test:e2e
```

### Code coverage for end-to-end tests

It will run e2e code coverage command on next-app:

```bash
yarn test:e2e:coverage
yarn nyc:report
```

Open html generated report on browser:

```bash
./test-coverage/e2e/index.html
```

## Visual regression tests

### Happo settings

Project relies on Happo as a visual regression tool. You need to have Happo api keys if you want to use them. Add to your global environment variables on your next-app or on your local machine.

```
HAPPO_API_KEY=XXX
HAPPO_API_SECRET=XXX
```

### Running Happo tests

It will run happo tests commands on next-app:

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

### Accessibility tests

Basic A11y tests are in place at `test/e2e/a11y.e2e.test.ts`

Make sure to keep it up to date, covering any new pages, dialogs, collapsable menus, etc.
