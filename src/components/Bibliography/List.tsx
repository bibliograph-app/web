import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { useContext } from "react";

import { BibliographyContext } from "./context";

export const List: React.FC<{
  className?: string;
  materials: { id: string; title: string }[];
}> = ({ className, materials }) => {
  const { focusId, changeFocus, changeShow } = useContext(BibliographyContext);

  return (
    <div
      className={clsx(
        className,
        ["h-full"],
        ["py-4"],
        ["bg-slate-200"],
        ["overflow-y-scroll"],
      )}
    >
      <div
        className={clsx(
          ["divide-y"],
        )}
      >
        {materials.map(({ id, title }) => (
          <div
            key={id}
            className={clsx(
              ["flex"],
            )}
          >
            <div
              className={clsx(
                ["flex-grow"],
                [["px-4"], ["py-3"]],
                ["flex", "items-center"],
                [
                  focusId !== id && ["bg-white"],
                  focusId === id && ["bg-teal-200"],
                ],
              )}
              onMouseEnter={() => {
                changeFocus(id);
              }}
              onMouseLeave={() => {
                if (focusId === id) changeFocus(null);
              }}
              onClick={() => {
                changeShow(id);
              }}
            >
              <span
                className={clsx(
                  ["text-xs"],
                  ["text-slate-900"],
                )}
              >
                {title}
              </span>
            </div>
            <Link href={{ pathname: "/materials/[id]", query: { id } }}>
              <a
                className={clsx(
                  ["flex", "items-center"],
                  ["px-4", "py-2"],
                  [["bg-blue-200"], ["text-blue-800"]],
                  [["hover:bg-blue-400"], ["hover:text-blue-50"]],
                )}
              >
                <ArrowTopRightOnSquareIcon
                  className={clsx(
                    ["flex-shrink-0"],
                    ["h-4"],
                  )}
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
