import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { useContext } from "react";

import { MouseFocusContext } from "~/components/MouseFocusContext";

export const MaterialsList: React.FC<{
  classNames?: string;
  focus: string | null;
  materials: { id: string; title: string }[];
}> = ({ classNames, materials }) => {
  const { focus, setFocus } = useContext(MouseFocusContext);

  return (
    <div
      className={clsx(
        classNames,
        ["h-full"],
        ["py-4"],
        ["bg-slate-200"],
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
              [["px-4"], ["py-3"]],
              [
                focus !== id && ["bg-white"],
                focus === id && ["bg-teal-200"],
              ],
              ["flex", ["items-center"]],
            )}
            onMouseEnter={() => {
              setFocus(id);
            }}
            onMouseLeave={() => {
              if (focus === id) setFocus(null);
            }}
          >
            <div
              className={clsx(
                ["flex-grow"],
                ["text-xs"],
                ["text-slate-900"],
              )}
            >
              {title}
            </div>
            <Link href={{ pathname: "/materials/[id]", query: { id } }}>
              <a>
                <div
                  className={clsx(
                    ["ml-2"],
                    ["p-2"],
                    ["rounded-md"],
                    ["text-slate-900"],
                    ["hover:bg-teal-400"],
                    ["hover:text-teal-50"],
                  )}
                >
                  <ArrowTopRightOnSquareIcon
                    className={clsx(
                      ["flex-shrink-0"],
                      ["h-4"],
                    )}
                  />
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
