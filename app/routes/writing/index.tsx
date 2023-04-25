import { isFullPage } from "@notionhq/client";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getDatabase } from "~/utils/notion.server";

export const loader: LoaderFunction = async () => {
  const posts = await getDatabase();
  return posts;
};

export default function Index() {
  const posts = useLoaderData() as QueryDatabaseResponse;
  return (
    <div className="space-y-16">
      <div className="space-y-2">
        <h1 className="text-base font-bold tracking-wider text-lochmara">
          Writing
        </h1>
      </div>

      <div className="space-y-2 text-lg lg:w-[65%]">
        {posts.results.map((post) => {
          // Posts are already sorted from latest
          // Remove the partial objects
          if (!isFullPage(post)) return null;
          // Remove post that isn't published
          // @ts-expect-error
          if (!post.properties["Published"].checkbox) return null;
          return (
            <Link
              to={`/writing/${post.id}`}
              key={post.id}
              className="flex items-center justify-between rounded-lg px-4 py-2 text-base transition-colors delay-100 duration-200 ease-in-out hover:bg-geyser focus:bg-geyser"
            >
              <h2>
                {
                  // @ts-expect-error
                  post.properties["Page"].title[0].plain_text
                }
              </h2>
              <p>
                {new Date(
                  // @ts-expect-error
                  post.properties["Date"].date.start
                ).toDateString()}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
