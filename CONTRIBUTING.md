# Contributing to keycodes

👍🎉 First off, thanks for taking the time to contribute! 👍🎉

The following is a set of guidelines for contributing to keycodes, which is hosted in the Toptal Organization on Github. Feel free to propose changes to this document in a pull request.

## Table Of Contents

- [Contributing to keycodes](#contributing-to-keycodes)
  - [Prerequisites](#prerequisites)
  - [Creating and Working on Issues](#creating-and-working-on-issues)
    - [Voting](#voting)
    - [Priority Matrix](#priority-matrix)
    - [Feature Requests](#feature-requests)
    - [Working on an Issue](#working-on-an-issue)
    - [Labels](#labels)
  - [Making Changes to the Code](#making-changes-to-the-code)
  - [Creating a Pull Request](#creating-a-pull-request)
    - [Pull Request Standards](#pull-request-standards)
    - [Pull Request and Commit Title](#pull-request-and-commit-title)
    - [Steps to Create a Pull Request](#steps-to-create-a-pull-request)
- [Coding Guidelines](#coding-guidelines)
  - [Our Tech Stack](#our-tech-stack)
  - [Code Principles](#code-principles)
- [Coding Conventions](#coding-conventions)
  - [Naming Conventions](#naming-conventions)
  - [Component Structure](#component-structure)
  - [Testing](#testing)
    - [Unit](#unit)
    - [E2E](#e2e)
    - [Visual](#visual)
    - [Prettier](#prettier)
    - [ESLint](#eslint)
- [Bots](#bots)

## Prerequisites

You will need the following tools in order to contribute to this project:

- [Git](https://git-scm.com/ 'https://git-scm.com/')
- [Node.JS](https://nodejs.org/en/ 'https://nodejs.org/en/'), **x64**, version `>=16`
- [Yarn](https://yarnpkg.com/en/ 'https://yarnpkg.com/en/'), follow the [installation guide](https://yarnpkg.com/en/docs/install 'https://yarnpkg.com/en/docs/install')

## Creating and Working on Issues

Thanks for considering contributing to this project, your help is very much appreciated!

We use issues for:

- reporting bugs
- requesting new features - specific functionality for a use case
- discussing ideas - general requests on how to improve the project

If you find your issue already exists, make relevant comments and add your [reaction](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments 'https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments'). Use a reaction in place of a "+1" comment:

- 👍 - upvote
- 👎 - downvote

If you can't find an existing issue that describes your bug or feature, create a new issue using the guidelines below.

### Voting

Requests with the most votes from the community will be prioritized, so if you find something that you'd like to be improved/fixed in the project upvote the discussion thread.

Every quarter our team will analyze every bug and feature request and prioritize them based on the Priority Matrix mentioned below. Tickets defined as "low priority" for 2 consecutive quarters will be removed to avoid clutter.

Although ideas with high impact and low/medium effort tend to be prioritized, it's not a rule of thumb that they will be developed.

### Priority Matrix

| Effort/Impact | Low    | Medium    | High      |
| ------------- | ------ | --------- | --------- |
| S             | Medium | Very High | Critical  |
| M             | Low    | Medium    | Very High |
| L             | Low    | Medium    | High      |

### Feature Requests

If you have any idea about improvements or a new feature, we want to hear about it. Please let us know by creating an issue using the proper template, but please check existing items before creating a new one to avoid duplicates.

If you would like to report a bug please check the "Issues" section in this repository.

For anything related to visual design, keep in mind that this project follows Toptal visual guidelines and our [product design system](https://picasso.toptal.net/ 'https://picasso.toptal.net/').

### Working on an Issue

Please consider the below practices when working on an issue.

- Pick an open issue labeled `help-wanted`. If you are new to contributions, it may be a good idea to also look for the `good-first-issue` label.
- Assign yourself to indicate you are working on the issue using Github's `assignees` option to let others know you are working on it and avoid conflicting contributions
- Follow all instructions in the pull request template and PR standards.
- Follow the coding guidelines.
- After submitting your pull request, verify that all status checks are passing. If the status check failed see the error message (it may just be a failing test which you can fix) or wait for the maintainer to guide you.
- Wait for review from maintainers.

### Labels

Labels apply to issues and pull requests.

|                 Label | Description                                                                    |
| --------------------: | ------------------------------------------------------------------------------ |
|       `triage-needed` | Issues that were opened but not yet analysed by the main contributors          |
|         `help-wanted` | Issues that have been discussed and approved, and need the execution to happen |
|                 `bug` | Bug report/fix                                                                 |
|     `feature-request` | New features                                                                   |
|    `good-first-issue` | Good issue for beginners                                                       |
| `missing-information` | Requires more information from the reporter                                    |
|             `blocked` | Issues blocked on other issues                                                 |
|               `stale` | Issues open for 30 days with no activity                                       |

## Making Changes to the Code

1.  Find an issue that you are interested in addressing or a feature that you would like to add.

2.  Fork the repository associated with the issue to your local GitHub organization personal Github account. This means you will have a copy of the repository under `your-GitHub-username/{project-repo}`.

3.  Clone the repository to your local machine using `git clone https://github.com/<your-github-username>/<project-repo>.git`

    1.  If you had already cloned the repository, [make sure your local copy is up to date](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/merging-an-upstream-repository-into-your-fork 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/merging-an-upstream-repository-into-your-fork').

4.  Create a new branch for your fix using `git checkout -b branch-name-here`.

5.  Make the appropriate changes for the issue you are trying to address or the feature you want to add. Before moving forward:

    1.  Contributions should be small and focused. If you're trying to tackle more than one issue or a new feature, please split the work into separate contributions.

    2.  Make sure the code you're creating follows our [Code Principles](#code-principles).

    3.  Make sure that your PR respects the PR standards and rules mentioned in the next section.

6.  Use `git add insert-paths-of-changed-files-here` to add the file contents of the changed files to the "snapshot" git uses to manage the state of the project, also known as the index.

7.  Use `git commit -m "fix: insert a short message of the changes made here"` to store the contents of the index with a descriptive message. Make sure the commit messages follow the specific pattern in the table below, otherwise the release will not be correctly generated.

8.  Push the changes to the remote repository using `git push origin branch-name-here`.

## Creating a Pull Request

Please make sure to read all information before opening a pull request.

### Pull Request Standards

- Pull requests should change one specific thing. If a pull request introduces multiple changes you may be asked to split it.
- Use a clear and descriptive title, as it will be used in the changelog. Refer to the PR title section below.
- Describe what was changed and link the GitHub issue.
- Provide detailed manual testing instructions.
- Fill out the checklist from the PR template.
- Your changes should be covered by tests. Make sure tests are passing before submitting a pull request to review.

### Pull Request and Commit Title

We follow [Semantic Versioning](https://semver.org/ 'https://semver.org/') using [semantic-release](https://github.com/semantic-release/semantic-release 'https://github.com/semantic-release/semantic-release'), and we are squashing PR commits on merge. So the title of your PR or commit should follow:

| Title                                                                                                                                                                        | Release type                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `fix: stop graphite breaking when too much pressure applied`                                                                                                                 | Fix Release                                                                                   |
| `feat: add 'graphiteWidth' option`                                                                                                                                           | Feature Release                                                                               |
| `perf: remove graphiteWidth option` `BREAKING CHANGE: The graphiteWidth option has been removed. The default graphite width of 10mm is always used for performance reasons.` | Breaking Release (Note that the `BREAKING CHANGE:` token must be in the footer of the commit) |

### Steps to Create a Pull Request

1.  [Submit a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request') to the upstream repository.
2.  Title the pull request with a short description of the changes and the issue number associated with the change. For instance, you can title an issue like so "Implement MongoDB support fixing #4352".
3.  In the description of the pull request, explain the changes. **If you are not sure about the proposed solution,** let us know by pointing out any issues you think exist with the pull request and any questions you have for the maintainer. It's OK if your pull request is not perfect (no pull request is). The reviewer will be able to help you fix any problems and improve them!
    1.  Add a section with the title "**How to test**" with a step-by-step that will help the reviewer validate the contribution.
4.  Wait for the pull request to be reviewed by a maintainer.
5.  Make changes to the pull request if the reviewing maintainer recommends them.
6.  Celebrate your success after your pull request is merged!

> We aim to review pull requests within 14 business days.

# Coding Guidelines

## Our Tech Stack

- [**NextJS**](https://nextjs.org/ 'https://nextjs.org/') - Open-source web development framework.
- [**ReactJS**](https://reactjs.org/ 'https://reactjs.org/') - JavaScript library for building user interfaces.
- [**TypeScript**](https://www.typescriptlang.org/ 'https://www.typescriptlang.org/') - Strict syntactical superset of JavaScript and adds optional static typing to the language.
- [**Yarn**](https://classic.yarnpkg.com/en/ 'https://classic.yarnpkg.com/en/') - Package Manager.
- [**Picasso**](https://github.com/toptal/picasso 'https://github.com/toptal/picasso') - Toptal's component library, based on Toptal's design system.
- [**Jest**](https://jestjs.io/ 'https://jestjs.io/') - JavaScript testing framework.
- [**Happo.io**](http://happo.io/ 'http://happo.io/') - Cross Browser screenshot testing service.

## Code Principles

- ["Always leave the campground cleaner than you found it"](https://www.oreilly.com/library/view/97-things-every/9780596809515/ch08.html 'https://www.oreilly.com/library/view/97-things-every/9780596809515/ch08.html').
- Write comprehensive but simple code
- Make sure the code is covered by robust tests.
- Make sure all the existing tests pass.
- Document your code thoroughly.
- User-facing code should support the following browsers:
  - Chrome (>= 78)
  - Firefox (>= 68)
  - Edge (>= 20)
  - Safari (>= 13)

# Coding Conventions

## Naming Conventions

- Use PascalCase for components folders (`TextField/index.tsx`, `PageHeader/index.tsx`, etc.)
- All the rest of the folder and file names should use kebab-case (`lib/utils/url-generator.ts`, `lib/constants/admin-routes.ts`, etc.)

## Component Structure

```
ComponentName
  ├── index.tsx
  ├── index.test.tsx
  ├── component-name.module.scss
  ├── test-ids.ts
```

- Declare only one component file (`ComponentName/index.tsx`) per folder
- Export only one component per component file, i.e. don't export two React components inside `ComponentName/index.tsx`
- All the files should follow the naming conventions

## Testing

### Unit

You can run unit tests with `yarn test:unit`. Component unit tests reside in the same directory as the component's `index.tsx` file. Library unit tests are placed in `test/lib`.

### E2E

E2e tests live in `test/e2e`. Execute them with `yarn test:e2e`.

### Visual

Visual tests are built using Happo, and can be found at `test/visual`. A happo run can be triggered with `yarn happo run`. It requires a Happo account, as well as appropriate `HAPPO_API_KEY` and `HAPPO_API_SECRET`.

[Happo](https://happo.io/ 'https://happo.io/') is a paid tool that offers a free plan for Open Source projects.

### Prettier

[Prettier](https://prettier.io/ 'https://prettier.io/') is a well-established code formatter, which automatically applies rules to the code we write, thus greatly reducing the differences in style and indentation that might appear from one programmer to the next. Our `package.json` file contains all the packages needed to install and execute prettier on your local development environment, as well as some useful scripts such as `yarn prettier:fix`

### ESLint

ESLint "is a static code analysis tool for identifying problematic patterns found in JavaScript code". The repository is equipped with a `.eslintrc` and a couple of tasks in `package.json` to help you lint your code. Code that offends lint rules will be rejected by CI checks. Make sure to run `yarn lint:fix` before committing your code. Or, even better, [integrate it with your preferred editor](https://eslint.org/docs/user-guide/integrations 'https://eslint.org/docs/user-guide/integrations').

# Bots

There are several bots activated in this repository:

- stale bot - marks issues as stale which has been open for 30 days with no activity. Then close them after another 14 days.
- dependabot - opens pull requests with package updates
