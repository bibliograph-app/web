import clsx from "clsx";
import { GraphQLClient } from "graphql-request";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NextPage } from "next";
import Head from "next/head";
import React, { ComponentProps, useMemo, useState } from "react";

import { Flow } from "~/components/Flow";
import { MaterialInfo } from "~/components/MaterialInfo";
import { MaterialsList } from "~/components/Materials";
import { MouseFocusContext } from "~/components/MouseFocusContext";
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
      references {
        material {
          id
          title
          isbn13
          cover
          references {
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
  const client = new GraphQLClient("http://localhost:4000/graphql");
  const { materials } = await client.request(fetchMaterialPagePathsQueryDocument);

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

  const client = new GraphQLClient("http://localhost:4000/graphql");
  const { material } = await client.request(fetchMaterialPageQueryDocument, { id: params.id });

  return {
    props: {
      id: material.id,
      title: material.title,
      isbn13: material.isbn13 || null,
      cover: material.cover || null,
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

export const PageBody: React.FC<ComponentProps<typeof Page>> = (props) => {
  const [focus, setFocus] = useState<string | null>(null);

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
        ...props.references.reduce(
          (prev, ref1) => [
            ...ref1.references.map((ref2) => (
              { id: ref2.id, title: ref2.title }
            )),
            { id: ref1.id, title: ref1.title },
            ...prev,
          ],
          [] as { id: string; title: string }[],
        ),
      ]
        .filter(({ id: id1 }, i, arr) => arr.findIndex(({ id: id2 }) => id2 === id1) === i),
    [props],
  );

  return (
    <main
      className={clsx(
        [["min-h-[720px]"], ["h-full"]],
        [["flex"], ["items-stretch"]],
      )}
    >
      <MouseFocusContext.Provider value={{ focus, setFocus }}>
        <div className={clsx(["w-72"], ["shadow-lg"])}>
          <MaterialsList className={clsx(["h-full"])} focus={focus} materials={listData} />
        </div>
        <div className={clsx([["flex-grow"], ["flex-shrink-0"]])}>
          {<Flow nodes={flowData.nodes} edges={flowData.edges} />}
        </div>
        <div className={clsx(["w-96"], ["shadow-lg"])}>
          <MaterialInfo
            className={clsx(["h-full"])}
            id={props.id}
          />
        </div>
      </MouseFocusContext.Provider>
    </main>
  );
};

export default Page;
