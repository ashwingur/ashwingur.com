Welcome to my website!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). I use Tailwind CSS for styling. Initial projects have used the built in backend, but for newer projects, authentication and rate limiting I am using my separate Flask backend.

The project is deployed on Vercel under the hobby plan. I am using Vercel analytics to track usage, but I have also been designing my own analytics system that can be viewed as a page on my website, as it provides me greater flexbility to track whatever actions I want and also store it indefinitely.

## Project Layout
Routes are located in the `pages` directory, and the built in api is mapped to `pages/api`.

- All React components are in the `components` directory.
- All context providers are in the `context` directory.
- The `data` directory contains any hardcoded json files, such as my Media Reviews.



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


