# Typescript Fullstack Project

This is the Bootcamp's Project Monorepo.

## Apps and Packages

- `server`: an [express](https://expressjs.com/) server app
- `client`: a react [vite](https://vitejs.dev) ts app
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- 
## Homework Pull Requests

This section contains the pull requests created as part of the bootcamp assignments:

- [Pull Request Homework 3](https://github.com/DiAmb/typescript-fullstack-bootcamp-project/pull/1)
    - The Database schema should be for a store. You must design a schema that includes products, variants, and collections.
    - The Database schema should be defined using Prisma ORM.
    - The Express.js API must use Prisma ORM with Typescript to query the data from the database.
    - Create Express.js routes for creating, reading, updating and deleting products in the database.

- [Pull Request Homework 4](https://github.com/DiAmb/typescript-fullstack-bootcamp-project/pull/2)
  - Create home, about, and search pages:
    - **Home Page**: Developed a welcoming UI that showcases featured products and includes quick links for navigation.
    - **About Page**: Added detailed descriptions of the project and team, providing a user-friendly overview.
    - **Search Page**: Implemented a functional search bar with suggestions and filters to enhance user experience.
  - **Shopping Cart Functionality**: 
    - Added a cart system that allows users to add products in individual quantities and remove them as needed.
    - Integrated a badge displaying the total items in the cart (only visible when items are present).
  - **UI Improvements with Dark Mode**:
    - Implemented a *dark mode toggle* using Tailwind CSS for better accessibility and user comfort.
    - Styled all pages to ensure consistency in light and dark modes.


## Get Started



### Pre Requisites

1. Install [Docker Desktop](https://docs.docker.com/get-started/get-docker/) and pull [PostgreSQL Image](https://hub.docker.com/_/postgres).
2. Install [Volta](https://docs.volta.sh/guide/getting-started) and [enable PNPM support](https://docs.volta.sh/advanced/pnpm).

### Install Dependencies

In the root directory open a terminal and install Node.js and PNPM using volta:

```
volta install node
```

```
volta install pnpm
```

Install the project dependencies:

```
pnpm install
```

### Run Applications

This monorepo is configured with [Turborepo](https://turbo.build/repo/docs). You will find the available tasks in [turbo.json](./turbo.json) file. You can run a task like the following. Note that all commands are used with `pnpm exec`, the purpose is to use the local project's Turborepo dependency and not a global one.

```bash
pnpm exec turbo <task-name>

# Examples
pnpm exec turbo dev
pnpm exec turbo build
pnpm exec turbo start
```

> Please refer to the official [Turborepo documentation](https://turbo.build/repo/docs/crafting-your-repository/running-tasks) to learn more on running tasks.
