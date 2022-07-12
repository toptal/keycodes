const fs = require('fs')
const path = require('path')
const readline = require('readline')

const docsDirectory = '/docs'
const readMeDirectory = './README.md'

const basicInfo = `# Site Acquisition Project Template

This is a [Next.js](https://nextjs.org/) project bootstrapped with [\`create-next-app\`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses TypeScript by default.\n`

const createContentLine = (line, file) => {
  let contentLine = ''
  const count = line.split('#').length - 1
  const fixedLine = line.replaceAll('#', '').trim()

  contentLine += new Array(count).join('  ')
  contentLine += `- [${fixedLine}](${docsDirectory}/${file}#${fixedLine
    .toLowerCase()
    .split(' ')
    .join('-')})\n`

  return contentLine
}

async function createTableOfContent(file) {
  const filePath = path.resolve(`.${docsDirectory}`, file)
  const fileStream = fs.createReadStream(filePath, 'utf-8')

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  let text = ''

  for await (const line of rl) {
    if (line.startsWith('#')) {
      text += createContentLine(line, file)
    }
  }

  return text
}

async function prepareDocs() {
  const directories = fs.readdirSync(`.${docsDirectory}`)
  let docsTableOfContent = ''

  for (const directory of directories) {
    docsTableOfContent += await createTableOfContent(directory)
  }

  fs.writeFileSync(
    readMeDirectory,
    `${basicInfo}\n${docsTableOfContent}\n`,
    'utf-8'
  )
}

prepareDocs()
