import { expect, PlaywrightTestConfig } from '@playwright/test'
import { matchers } from 'expect-playwright'

expect.extend(matchers)

const config: PlaywrightTestConfig = {
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
  webServer: {
    command: 'yarn build:e2e && yarn start',
    url: 'http://localhost:3000',
    env: {
      E2E_COVERAGE: 'true',
      NODE_ENV: 'production'
    },
    timeout: 120 * 1000
  },
  projects: [
    {
      name: 'e2e',
      outputDir: 'screenshots',
      testMatch: '**/*.e2e.test.ts',
      timeout: 30000,
      use: {
        baseURL: 'http://localhost:3000'
      }
    }
  ],
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: 'reports',
        outputFile: 'playwright-report-e2e.html'
      }
    ]
  ]
}

export default config
