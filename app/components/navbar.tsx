/* eslint-disable jsx-a11y/anchor-has-content */
import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

const LINKS = [
  { name: "Home", to: "/" },
  { name: "Writing", to: "/writing" },
  { name: "Random Photo", to: "/photo" },
];

function NavbarLink({
  to,
  ...props
}: Omit<Parameters<typeof Link>["0"], "to"> & { to: string }) {
  const location = useLocation();
  const currentLocation =
    to === location.pathname || location.pathname.startsWith(`${to}/`);
  return (
    <li>
      <Link
        prefetch="intent"
        to={to}
        className={clsx(
          "whitespace-nowrap transition-colors delay-100 duration-200 ease-in-out hover:text-lochmara focus:text-lochmara",
          {
            "border-b-2 border-b-lochmara text-lochmara":
              currentLocation,
          }
        )}
        {...props}
      />
    </li>
  );
}

function MobileMenuList({ isOpen }: { isOpen: boolean }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("fixed");
      document.body.classList.add("overflow-y-scroll");
      document.body.style.height = "100vh";
    } else {
      document.body.classList.remove("fixed");
      document.body.classList.remove("overflow-y-scroll");
      document.body.style.removeProperty("height");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div className="absolute top-28 bottom-0 left-0 right-0">
          <div className="flex flex-col h-full overflow-y-scroll border-t border-lochmara bg-aqua-haze pb-12">
            <div className="border-none bg-transparent p-0">
              {LINKS.map((link) => (
                <Link
                  to={link.to}
                  key={link.to}
                  prefetch="intent"
                  className="text-base flex border-b border-lochmara px-5 py-9 hover:bg-lochmara focus:bg-lochmara hover:text-lochmara"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function MobileMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <button
        className="flex h-12 w-12 flex-col items-center justify-center rounded-full border-2 border-lochmara"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={clsx(
            "ease mt-1 h-1 w-6 transform rounded-full bg-cod-gray transition duration-300",
            {
              "translate-y-2 rotate-45": isOpen,
            }
          )}
        />
        <div
          className={clsx(
            "ease my-1 h-1 w-6 transform rounded-full bg-cod-gray transition duration-300",
            {
              "opacity-0": isOpen,
            }
          )}
        />
        <div
          className={clsx(
            "ease mb-1 h-1 w-6 transform rounded-full bg-cod-gray transition duration-300",
            {
              "-translate-y-2 -rotate-45": isOpen,
            }
          )}
        />
      </button>
    </>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="mx-auto flex items-center justify-between px-[6vw] py-8 text-base lg:py-12">
      <div>
        <Link to="/" prefetch="intent" className="whitespace-nowrap">
          <h1 className="font-semibold">
            Debert Jamie
          </h1>
        </Link>
      </div>

      <div className="block lg:hidden">
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        <MobileMenuList isOpen={isOpen} />
      </div>

      <ul className="hidden lg:flex lg:gap-x-6">
        {LINKS.map((link) => {
          return (
            <NavbarLink key={link.to} to={link.to}>
              {link.name}
            </NavbarLink>
          );
        })}
      </ul>
    </nav>
  );
}
