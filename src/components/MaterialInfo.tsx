import clsx from "clsx";
import request from "graphql-request";
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
      {!isValidating && data
        && (
          <>
            <h1
              className={clsx(
                ["text-slate-900"],
                ["text-xl"],
                ["font-bold"],
              )}
            >
              {data.material.title}
            </h1>
            <ul>
              {data.material.authorships.map(({ author }) => (
                <li key={author.id}>
                  {author.name}
                </li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};
