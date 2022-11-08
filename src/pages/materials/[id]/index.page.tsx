import clsx from "clsx";
import gqlRequest from "graphql-request";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NextPage } from "next";
import Head from "next/head";
import React, { ComponentProps, useMemo, useState } from "react";
import useSWR from "swr";

import { BibliographyContext, Flow, MaterialDetails, MaterialsList } from "~/components/Bibliography";
import { graphql } from "~/gql";

const fetchMaterialPagePathsQueryDocument = graphql(`
  query fetchMaterialPagePaths {
    materials {
      id
    }
  }
`);

const fetchMaterialPageQueryDocument = graphql(`
  query fetchMaterialPage($id: ID!) {
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
      references {
        material {
          id
          title
          isbn13
          cover
          references(limit: 5) {
            material {
              id
              title
              isbn13
              cover
            }
          }
        }
      }
    }
  }
`);

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const { materials } = await gqlRequest(process.env.NEXT_PUBLIC_GRAPHQL_API_URL, fetchMaterialPagePathsQueryDocument);

  return {
    paths: materials.map(({ id }) => ({
      params: { id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  {
    id: string;
    title: string;
    isbn13: string | null;
    cover: string | null;
    authorships: {
      author: { id: string; name: string };
    }[];
    references: {
      id: string;
      title: string;
      isbn13: string | null;
      cover: string | null;
      references: {
        id: string;
        title: string;
        isbn13: string | null;
        cover: string | null;
      }[];
    }[];
  },
  { id: string }
> = async ({ params }) => {
  if (!params) return { notFound: true };

  const { material } = await gqlRequest(
    process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    fetchMaterialPageQueryDocument,
    { id: params.id },
  );

  return {
    props: {
      id: material.id,
      title: material.title,
      isbn13: material.isbn13 || null,
      cover: material.cover || null,
      authorships: material.authorships.map(({ author }) => ({ author: { id: author.id, name: author.name } })),
      references: material.references.map(({ material }) => ({
        id: material.id,
        title: material.title,
        isbn13: material.isbn13 || null,
        cover: material.cover || null,
        references: material.references.map(({ material }) => ({
          id: material.id,
          title: material.title,
          isbn13: material.isbn13 || null,
          cover: material.cover || null,
        })),
      })),
    },
    revalidate: 60,
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <>
      <Head>
        <title>Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBody {...props} />
    </>
  );
};

const fetchMaterialInfoQueryDocument = graphql(`
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

export const PageBody: React.FC<ComponentProps<typeof Page>> = (props) => {
  const [focus, setFocus] = useState<string | null>(null);
  const [showing, onClick] = useState<string | null>(null);

  const flowData: Pick<ComponentProps<typeof Flow>, "nodes" | "edges"> = useMemo(() => {
    const nodes = [
      { id: props.id, title: props.title, thumbnail: props.cover, nest: [0] },
      ...props.references.reduce(
        (prev, ref1, i1) => [
          ...ref1.references.map((ref2, i2) => (
            { id: ref2.id, title: ref2.title, thumbnail: ref2.cover, nest: [0, i1, i2] }
          )),
          { id: ref1.id, title: ref1.title, thumbnail: ref1.cover, nest: [0, i1] },
          ...prev,
        ],
        [] as ComponentProps<typeof Flow>["nodes"],
      ),
    ].filter(({ id: id1 }, i, arr) => arr.findIndex(({ id: id2 }) => id2 === id1) === i);
    const edges = props.references
      .reduce(
        (prev, ref1) => [
          ...ref1.references.map((ref2) => ({
            id: `${ref1.id}-${ref2.id}`,
            from: ref1.id,
            to: ref2.id,
            type: { tag: "REFER" as const },
          })),
          {
            id: `${props.id}-${ref1.id}`,
            from: props.id,
            to: ref1.id,
            type: { tag: "REFER" as const },
          },
          ...prev,
        ],
        [] as ComponentProps<typeof Flow>["edges"],
      )
      .filter(({ id: id1 }, i, arr) => arr.findIndex(({ id: id2 }) => id2 === id1) === i);
    return ({
      nodes,
      edges,
    });
  }, [props]);

  const listData = useMemo<ComponentProps<typeof MaterialsList>["materials"]>(
    () =>
      [
        { id: props.id, title: props.title, thumbnail: null, nest: [0] },
        ...props.references
          .reduce(
            (prev, ref1) => [
              ...ref1.references.map((ref2) => ({ id: ref2.id, title: ref2.title })),
              { id: ref1.id, title: ref1.title },
              ...prev,
            ],
            [] as { id: string; title: string }[],
          ).reverse(),
      ]
        .filter(({ id: id1 }, i, arr) => arr.findIndex(({ id: id2 }) => id2 === id1) === i),
    [props],
  );

  const { data, error, isValidating } = useSWR(
    (showing && showing !== props.id) && [fetchMaterialInfoQueryDocument, { id: showing }],
    (query, variables) => gqlRequest(process.env.NEXT_PUBLIC_GRAPHQL_API_URL, query, variables),
  );
  const details = useMemo<
    {
      id: string;
      title: string;
      cover: string | null;
      authorships: { author: { id: string; name: string } }[];
    } | null
  >(() => {
    if (!showing || showing === props.id) {
      return {
        id: props.id,
        title: props.title,
        cover: props.cover,
        authorships: props.authorships,
      };
    } else if (data) {
      return {
        id: data.material.id,
        title: data.material.title,
        cover: data.material.cover || null,
        authorships: data.material.authorships.map(({ author }) => ({ author: { id: author.id, name: author.name } })),
      };
    }
    return null;
  }, [data, props, showing]);

  return (
    <BibliographyContext.Provider
      value={{
        focusId: focus,
        showId: showing,
        changeFocus: (id) => {
          setFocus(id);
        },
        changeShow: (id) => {
          onClick(id);
        },
      }}
    >
      <main
        className={clsx(
          ["relative"],
          [["min-h-[720px]"], ["h-full"]],
          [["flex"], ["items-stretch"]],
        )}
      >
        <MaterialsList
          className={clsx(
            ["h-full"],
            ["w-72"],
            ["bg-slate-100"],
            ["shadow-lg"],
          )}
          materials={listData}
        />
        <MaterialDetails
          className={clsx(
            ["absolute", ["right-0"]],
            ["z-10"],
            ["w-96"],
            ["h-full"],
            ["bg-white", ["bg-opacity-50"], ["backdrop-blur-sm"]],
            ["shadow-lg"],
          )}
          details={details}
        />
        <div className={clsx([["flex-grow"], ["flex-shrink-0"]])}>
          {<Flow nodes={flowData.nodes} edges={flowData.edges} />}
        </div>
      </main>
    </BibliographyContext.Provider>
  );
};

export default Page;
