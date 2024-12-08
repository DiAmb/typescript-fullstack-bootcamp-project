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
      
- [Pull Request Homework 5](https://github.com/DiAmb/typescript-fullstack-bootcamp-project/pull/3)
    - **ProductCard Component Tests**:
        - **Test**: Verifies that the product name, description, and image are correctly displayed for a valid product.
        - **Test**: Verifies the behavior when no image is provided for the product (ensures fallback mechanism works).
        - **Test**: Checks the proper display of long product names and descriptions, ensuring they fit within the UI without breaking.
    
    - **collectionsQueryOptions Test**:
        - **Test**: Verifies that the collectionsQueryOptions function returns the correct structure.
        - **Test**: Mocks the API response for a successful fetch and validates the returned data.

    - **formatPrice Function Test**:
        - **Test**: Ensures the price formatting function correctly converts cents into a currency string.
        - **Test**: Verifies that the function throws an error when negative values or decimal prices are passed.

    - **getProductQueryOptions Test**:
        - **Test**: Verifies the structure of query options when a product ID is passed.
        - **Test**: Mocks the API response and verifies that the fetch operation completes successfully.
        - **Test**: Ensures that an error is thrown when the fetch operation fails.

    - **productsQueryOptions Test**:
        - **Test**: Validates the query structure for product search based on the provided search query.
        - **Test**: Ensures the function handles missing optional parameters correctly.
        - **Test**: Confirms the proper URL generation and data fetching with mocked API responses.

    - **Integration Tests**:
        - **Supertest ProductsRoute (Server-side)**:
            - **Test**: Verifies that the `GET /api/products` endpoint correctly returns a list of products.
            - **Test**: Confirms that `GET /api/products/:id` returns the correct product when a valid ID is passed.
            - **Test**: Ensures a 404 response is returned when a non-existent product ID is requested.
            - **Test**: Verifies that a 400 error is returned for an invalid product ID format.
            - Mocked the `ProductsService` to simulate real-world API interactions and handle product fetching in all test scenarios.


- [Pull Request Homework 6](https://github.com/DiAmb/typescript-fullstack-bootcamp-project/pull/4)
    - **End-to-End (E2E) Testing**:
        - **Test**: Navigates to the search products page, selects filters, and clicks on a product to view the details. Verifies that the product details page loads correctly, with the correct product displayed and the URL updated to reflect the product's ID.
        - **Test**: Fills in filters, such as category selection (e.g., "Animals"), and performs a search. Verifies that the API responds with the correct data, and clicks on a product to ensure it loads the details page with the correct product.
        - **Test**: Adds a product to the shopping cart, waits for the cart to update, and navigates to the cart page. Verifies that the correct product is displayed in the cart and that the price is accurate.
        - **Test**: Verifies theme toggling between light and dark modes on the About page. Checks the initial theme, toggles to dark mode, and ensures that the class on the document element is updated correctly. Then, it toggles back to light mode and verifies the theme change.

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
