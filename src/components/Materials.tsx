import clsx from "clsx";
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
        ["min-h-full"],
        ["divide-y"],
        ["bg-slate-200"],
      )}
    >
      {materials.map(({ id, title }) => (
        <div
          key={id}
          className={clsx(
            ["bg-white"],
            ["px-4"],
            ["py-2"],
            focus === id && [
              "bg-teal-200",
            ],
          )}
          onMouseEnter={() => {
            setFocus(id);
          }}
          onMouseLeave={() => {
            if (focus === id) setFocus(null);
          }}
        >
          <div className={clsx(["text-xs"])}>{title}</div>
        </div>
      ))}
    </div>
  );
};
