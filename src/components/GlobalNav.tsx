import clsx from "clsx";
import Link from "next/link";
import React from "react";

export const GlobalNav: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <nav
      className={clsx(
        className,
        ["bg-slate-50"],
        ["shadow-md"],
        ["z-10"],
        ["w-full"],
      )}
    >
      <div
        className={clsx(
          ["mx-auto"],
          ["h-full"],
          ["container", "max-w-screen-xl"],
          ["flex"],
          ["items-center"],
        )}
      >
        <Link href="/">
          <a
            className={clsx(
              "block",
              [["px-2"], ["py-2"]],
              ["font-['Silkscreen']"],
              ["text-2xl"],
              ["text-slate-700"],
              ["select-none"],
            )}
          >
            Bibliograph
          </a>
        </Link>
      </div>
    </nav>
  );
};
