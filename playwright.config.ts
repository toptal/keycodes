import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  fullyParallel: true,
  retries: 2,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    viewport: { width: 1440, height: 900 },
    bypassCSP: true,
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-gpu',
        '--disable-dev-shm-usage'
      ]
    }
  },
  projects: [
    {
      name: 'e2e',
      testDir: 'test/e2e',
      outputDir: 'screenshots',
      timeout: 30000,
      use: {
        baseURL: 'http://localhost:3000'
      }
    }
  ],
  webServer: {
    command: 'yarn build:e2e:start',
    url: 'http://localhost:3000',
    env: {
      E2E_COVERAGE: 'true',
      NODE_ENV: 'production'
    },
    timeout: 120 * 100000
  },
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: 'reports'
      }
    ]
  ]
}

export default config
