import clsx from "clsx";
import { NextPage } from "next";
import Link from "next/link";

const Page: NextPage<{}> = ({}) => {
  return (
    <>
      <main
        className={clsx(
          ["min-h-[480px]"],
          ["mx-auto"],
          ["h-full"],
          ["container", "max-w-screen-xl"],
          [
            "flex",
            ["flex-col"],
            ["justify-center"],
            ["items-center"],
          ],
        )}
      >
        <h1
          className={clsx(
            ["font-['Silkscreen']"],
            ["text-4xl"],
            ["tracking-wider"],
            ["text-slate-700"],
          )}
        >
          Bibliograph
        </h1>
        <div className={clsx(["mt-8"])}>
          <ul className={clsx(["list-decimal"])}>
            <li>
              <Link href={{ pathname: "/materials/[id]", query: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" } }}>
                <a>プログラミング言語の基礎概念</a>
              </Link>
            </li>
            <li>
              <Link href={{ pathname: "/materials/[id]", query: { id: "9922d80a-e433-4773-8a7b-8ff19f8a9256" } }}>
                <a>数理論理学(戸次)</a>
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Page;
