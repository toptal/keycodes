import { capitalizeFirstLetter } from './capitalize-first-letter'

describe('Capitalize first letter', () => {
  it.each([
    ['hello', 'Hello'],
    ['is it me', 'Is it me'],
    ['y', 'Y'],
    [' ', ' ']
  ])('correctly capitalizes "%s" to "%s"', (input, output) => {
    expect(capitalizeFirstLetter(input)).toEqual(output)
  })
})
