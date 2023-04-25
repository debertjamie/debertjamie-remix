import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import tailwindStyles from "./tailwind.css";
import globalStyles from "./global.css";
import notionStyles from "./notion.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/images/logo.png",
    type: "image/png",
  },
  {
    rel: "preload",
    as: "font",
    href: "/fonts/Raleway.ttf",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: notionStyles },
];

export const meta: MetaFunction = () => {
  const title = "Debert Jamie | Student";
  const description = "Debert Jamie's Portfolio";
  return {
    charset: "utf-8",
    title,
    description,
    "og:type": "website",
    "og:url": "https://debertjamie.is-a.dev",
    "og:title": title,
    "og:description": description,
    "og:image": "/images/logo.png",
    "twitter:card": "summary_large_image",
    "twitter:url": "https://debertjamie.is-a.dev",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": "/images/logo.png",
    viewport: "width=device-width,initial-scale=1",
  };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="scrollbar mx-auto bg-aqua-haze font-['Raleway'] text-cod-gray">
        <div>
          <Navbar />
          <div className="mx-8 lg:mx-20">
            <Outlet />
          </div>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error("Error", error.message);
  return (
    <html lang="en">
      <head>
        <title>Server Error</title>
        <Links />
      </head>
      <body className="scrollbar h-screen bg-aqua-haze font-['Raleway'] text-cod-gray">
      <div className="flex justify-center items-center h-screen text-xl">
            <p className="pr-4">500</p>
            <p className="pl-4 border-l-2 border-cod-gray">Server Error</p>
          </div>
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.error("CatchBoundary", caught);
  if (caught.status === 404) {
    return (
      <html lang="en">
        <head>
          <title>Not Found</title>
          <Links />
        </head>
        <body className="scrollbar h-screen bg-aqua-haze font-['Raleway'] text-cod-gray">
          <div className="flex justify-center items-center h-screen text-xl">
            <p className="pr-4">404</p>
            <p className="pl-4 border-l-2 border-cod-gray">Not Found</p>
          </div>
          <Scripts />
        </body>
      </html>
    );
  } else if (caught.status === 403) {
    // Just in case
    return (
      <html lang="en">
        <head>
          <title>Forbidden</title>
          <Links />
        </head>
        <body className="scrollbar h-screen bg-aqua-haze font-['Raleway'] text-cod-gray">
        <div className="flex justify-center items-center h-screen text-xl">
            <p className="pr-4">403</p>
            <p className="pl-4 border-l-2 border-cod-gray">Forbidden</p>
          </div>
          <Scripts />
        </body>
      </html>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}
