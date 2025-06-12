Welcome to my website!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). I use Tailwind CSS for styling. Initial projects have used the built-in backend, but for all new projects, authentication and rate limiting I am using my separate Flask backend ([`api.ashwingur`](https://github.com/ashwingur/api.ashwingur)).

The project is deployed on Vercel under the hobby plan. I am using Vercel analytics to track usage, but I have also been designing my own analytics system that can be viewed as a page on my website, as it provides me greater flexbility to track whatever actions I want and also store it indefinitely.

## Project Layout

Routes are located in the `pages` directory, and the built in api is mapped to `pages/api`.

- All React components are in the `components` directory.
- All context providers are in the `context` directory.
- The `data` directory contains any hardcoded json files, such as my Media Reviews.
- Themes are defined in the `styles` folder and the selection logic is in `@components/ToggleThemeButton.tsx`. The next-themes `ThemeProvider` is used in `_app.tsx`.
- For all api calls with my new backend, zod schema validation is used, defined in `shared/validations`. The relevant API calls with react-query are in `shares/queries`. There are still some old pages where the query function is defined in the react component (to be refactored).

## Testing

The `playwright-tests` folder defines E2E tests for various flows on the website. It tests both mobile and desktop layouts, including chrome, safari, firefox and webkit.

### Usage

- `npm run test` - run all tests
- `npm run test <folder|file>` - run all tests in a folder or file
- `npm run test -- --headed` - run tests and show the browsers
- `npm run test -- --project=<project name>` - run tests for a specific browser: `firefox`, `chromium`, `safari`, `"Mobile Chrome"`, `"Mobile Safari"`.

## Environment File

`.env`

```
PUSHER_APP_ID = "xxx"
PUSHER_SECRET = "xxx"
NEXT_PUBLIC_PUSHER_CLUSTER = "ap4"
NEXT_PUBLIC_PUSHER_KEY = "xxx"
COC_DEV_EMAIL = "xxx"
COC_DEV_PASS = "xxx"
COC_BEARER_TOKEN = "xxx"
MONGO_USERNAME = "xxx"
MONGO_PASSWORD = "xxx"
MONGODB = "xxx"
CLANTRACK_PIN = "xxx"
OPEN_DATA_TOKEN = "xxx"
NEXT_PUBLIC_ASHWINGUR_API = "http://localhost:5000"
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Also make sure `api.ashwingur` is running for full functionality.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
