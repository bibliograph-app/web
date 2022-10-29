import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Details: React.FC<{
  className?: string;
  details: {
    id: string;
    title: string;
    cover: string | null;
    authorships: { author: { id: string; name: string } }[];
  } | null;
}> = ({ className, details }) => {
  return (
    <div className={clsx(className, ["px-8"], ["py-8"])}>
      {!details && <>LOADING...</>}
      {details && (
        <div className={clsx(className)}>
          <div className={clsx(["w-full"], ["flex", ["justify-center"]])}>
            {details.cover && (
              <Image
                src={details.cover}
                width={192}
                height={192}
                objectFit="scale-down"
                alt={`image of ${details.title}`}
              />
            )}
            {!details.cover && (
              <div className={clsx(["w-full"], ["h-48"])}>
                <span>No cover</span>
              </div>
            )}
          </div>
          <h1
            className={clsx(
              ["mt-4"],
              ["text-slate-900"],
              ["text-xl"],
              ["font-bold"],
            )}
          >
            {details.title}
          </h1>
          <ul>
            {details.authorships.map(({ author }) => (
              <li key={author.id}>
                <Link href={{ pathname: "/authors/[id]", query: { id: author.id } }}>
                  {author.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
