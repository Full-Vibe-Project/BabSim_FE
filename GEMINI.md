## Project Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It uses TypeScript, Tailwind CSS, and pnpm as a package manager. The project is configured with ESLint for linting, Prettier for formatting, and Husky with commitlint for enforcing commit message conventions.

## Building and Running

*   **Development:** `pnpm dev`
*   **Build:** `pnpm build`
*   **Start:** `pnpm start`
*   **Lint:** `pnpm lint`

## Development Conventions

*   **Commit Messages:** This project enforces conventional commit messages using `commitlint`. Please refer to `gemini/conventions/01-git/02-commit-message.md` for the commit message format.
*   **Code Style:** The project uses ESLint and Prettier to maintain a consistent code style. It is recommended to configure your editor to format on save.

---

### Conventions
*   **Commit Messages:** This project enforces conventional commit messages using `commitlint`. Please refer to `gemini/conventions/01-git/02-commit-message.md` for the commit message format.
*   **Code Style:** The project uses ESLint and Prettier to maintain a consistent code style. It is recommended to configure your editor to format on save.

Conventions required for writing code are located under the '/gemini' folder.
Refer to the folder structure diagram below, and consult the md files under the gemini folder for coding conventions.

---

### Error Management
If an error occurs, I will document it in './gemini/error/error-msg.md'.
Based on the error message, please analyze the cause and record the solution in './gemini/error/error.md'.
Please adhere to the following format for error logging.

```
Error Message:
Context:
Suspected Cause:
Solution:
```