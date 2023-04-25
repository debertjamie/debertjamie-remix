import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { ExternalLink } from "~/components/links";
import { ExternalLinks } from "~/externals";

export const meta: MetaFunction = () => {
  const title = "Debert Jamie | Student";
  return {
    title,
    "og:title": title,
    "twitter:title": title,
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "canonical",
      href: "https://debertjamie.is-a.dev",
    },
  ];
};

export default function Index() {
  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-shadow text-3xl font-extrabold leading-[5rem] tracking-tight text-lochmara lg:w-[55%] lg:text-5xl">
          Debert Jamie Chanderson
        </h1>
      </div>

      <div className="space-y-2">
        <h2 className="text-base font-bold tracking-wider text-lochmara">
          About Me
        </h2>
        <div className="space-y-2 text-lg lg:w-[65%]">
          <p>
            Exploring experiences. Somehow obsessed in mathematics and
            IT-related stuff. Likes watching South Park.
          </p>
          <p>
            Studying in High School. Currently interested in Javascript,
            Typescript and C++.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-base font-bold tracking-wider text-lochmara">
          Contact
        </h2>
        <div className="grid grid-cols-responsive gap-6 text-lg lg:w-[65%]">
          <div>
            <h3 className="text-lg">Github</h3>
            <ExternalLink href={ExternalLinks.github} className="text-base">
              debertjamie
            </ExternalLink>
          </div>
          <div>
            <h3 className="text-lg">Twitter</h3>
            <ExternalLink href={ExternalLinks.twitter} className="text-base">
              debertjamie
            </ExternalLink>
          </div>
          <div>
            <h3 className="text-lg">Instagram</h3>
            <ExternalLink href={ExternalLinks.instagram} className="text-base">
              debertjamieeee_
            </ExternalLink>
          </div>
          <div>
            <h3 className="text-lg">Email</h3>
            <ExternalLink href={ExternalLinks.email} className="text-base">
              debert123[at]protonmail(dot)com
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
}
