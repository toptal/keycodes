import redirectChecker from '.'

const fetchMock = jest.fn()

const originalFetch = global.fetch

const originalUrl = 'http://test.dev'
const expectedUrl = 'http://testredirected.dev'

describe('redirectChecker', () => {
  beforeAll(() => {
    global.fetch = fetchMock
  })

  afterAll(() => {
    global.fetch = originalFetch
  })

  describe('when url is redirected', () => {
    it('returns successful data', async () => {
      fetchMock.mockImplementationOnce(() => ({
        redirected: true,
        url: expectedUrl
      }))

      expect(await redirectChecker(originalUrl, expectedUrl)).toEqual(
        `redirected to ${expectedUrl}`
      )
    })
  })

  describe('when url is not redirected', () => {
    it('throws an error', async () => {
      fetchMock.mockImplementationOnce(() => ({
        redirected: false,
        url: 'xxx'
      }))

      await expect(async () => {
        await redirectChecker(originalUrl, expectedUrl)
      }).rejects.toThrow('Did not redirect')
    })
  })
})
