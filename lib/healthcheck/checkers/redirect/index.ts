const redirectChecker = async (
  originalUrl: string,
  expectedUrl: string
): Promise<string> => {
  const response = await fetch(originalUrl)

  if (response.redirected && response.url === expectedUrl) {
    return `redirected to ${expectedUrl}`
  } else {
    throw new Error('Did not redirect')
  }
}

export default redirectChecker
