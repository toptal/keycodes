import { injectAxe, checkA11y, configureAxe } from 'axe-playwright'

const testA11y: typeof checkA11y = async (
  page,
  context,
  options
): Promise<void> => {
  await injectAxe(page)
  await configureAxe(page, {
    rules: [
      // https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md
      // Examples:
      // { id: 'color-contrast', enabled: false },
      // { id: 'page-has-heading-one', enabled: false },
    ]
  })

  await checkA11y(page, context, {
    ...Object.assign({}, options),
    detailedReport: true
  })
}

export { testA11y }
