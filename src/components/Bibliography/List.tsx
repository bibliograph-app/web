import clsx from "clsx";
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
          </div>
        ))}
      </div>
    </div>
  );
};
