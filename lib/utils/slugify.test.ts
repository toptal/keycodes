import { slugifyForRedirects } from './slugify'

describe('Slugify for redirects function', () => {
  it('correctly returns url', () => {
    expect(slugifyForRedirects('text')).toEqual('/text')
  })

  it('correctly returns url when text contains space', () => {
    expect(slugifyForRedirects('text1 text2')).toEqual('/text1-text2')
  })

  it('correctly returns url when text contains special character', () => {
    expect(slugifyForRedirects('text1-text2 / ë')).toEqual('/text1-text2-e')
  })

  it('correctly returns url when text contains slash', () => {
    expect(slugifyForRedirects('text1/text2 / -')).toEqual('/text1-text2')
  })

  it('correctly returns url when text contains uppercase characters', () => {
    expect(slugifyForRedirects('TExT1 / ê')).toEqual('/text1')
  })

  it('correctly returns url when text contains slash with special characters', () => {
    expect(slugifyForRedirects('< /text1 >, text2')).toEqual('/text1-text2')
  })

  it('correctly returns url when text contains numbers', () => {
    expect(slugifyForRedirects('text1 223 ,')).toEqual('/text1-223')
  })

  it('correctly returns url when text contains multiple special characters', () => {
    expect(slugifyForRedirects('- + , * )')).toEqual('/')
  })
})
