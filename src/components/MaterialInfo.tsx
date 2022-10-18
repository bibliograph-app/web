import clsx from "clsx";
import request from "graphql-request";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

import { graphql } from "~/gql";

const fetchMaterialPagePathsQueryDocument = graphql(`
  query fetchMaterialInfo($id: ID!) {
    material(id: $id) {
      id
      title
      isbn13
      cover
      authorships {
        author {
          id
          name
        }
      }
    }
  }
`);

export const Info: React.FC<{
  className?: string;
  title: string;
  cover: string | null;
  authorships: {
    author: { id: string; name: string };
  }[];
}> = ({ className, cover, title, authorships }) => {
  return (
    <div className={clsx(className)}>
      <div className={clsx(["w-full"], ["flex", ["justify-center"]])}>
        {cover && (
          <Image
            src={cover}
            width={192}
            height={192}
            objectFit="scale-down"
            alt={`image of ${title}`}
          />
        )}
        {!cover && (
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
        {title}
      </h1>
      <ul>
        {authorships.map(({ author }) => (
          <li key={author.id}>
            {author.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const MaterialInfo: React.FC<{
  className?: string;
  id: string;
}> = ({ className, id }) => {
  const { data, error, isValidating } = useSWR(
    [fetchMaterialPagePathsQueryDocument, { id }],
    (query, variables) => request("http://localhost:4000/graphql", query, variables),
  );

  return (
    <div
      className={clsx(
        className,
        ["px-8"],
        ["py-8"],
      )}
    >
      {isValidating && <>LOADING...</>}
      {!isValidating && data && (
        <Info
          title={data.material.title}
          cover={data.material.cover || null}
          authorships={data.material.authorships}
        />
      )}
    </div>
  );
};
