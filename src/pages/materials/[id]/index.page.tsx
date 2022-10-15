import clsx from "clsx";
import { GraphQLClient } from "graphql-request";
import { GetStaticPaths, GetStaticProps } from "next";
import { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import React, { ComponentProps, useMemo, useState } from "react";

import { Flow, FlowType } from "~/components/Flow";
import { MaterialsList } from "~/components/Materials";
import { MouseFocusContext } from "~/components/MouseFocusContext";
import { graphql } from "~/gql";

const fetchMaterialPageQueryDocument = graphql(`
  query fetchMaterialPage($id: ID!) {
    material(id: $id) {
      id
      title
      isbn13
      references {
        material {
          id
          title
          isbn13
          references {
            material {
              id
              title
              isbn13
            }
          }
        }
      }
    }
  }
`);

export const getStaticPaths: GetStaticPaths<{ id: string }> = () => {
  return {
    paths: [{
      params: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
    }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  {
    id: string;
    title: string;
    isbn13: string | null;
    references: {
      id: string;
      title: string;
      isbn13: string | null;
      references: { id: string; title: string; isbn13: string | null }[];
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
      references: material.references.map(({ material }) => ({
        id: material.id,
        title: material.title,
        isbn13: material.isbn13 || null,
        references: material.references.map(({ material }) => ({
          id: material.id,
          title: material.title,
          isbn13: material.isbn13 || null,
        })),
      })),
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const [focus, setFocus] = useState<string | null>(null);
  const flowData = useMemo<FlowType>(() => {
    const nodes: FlowType["nodes"] = [
      { id: props.id, title: props.title, thumbnail: null, nest: [0] },
      ...props.references.reduce(
        (prev, ref1, i1) => [
          ...ref1.references.map((ref2, i2) => (
            { id: ref2.id, title: ref2.title, thumbnail: null, nest: [0, i1, i2] }
          )),
          { id: ref1.id, title: ref1.title, thumbnail: null, nest: [0, i1] },
          ...prev,
        ],
        [] as FlowType["nodes"],
      ),
    ].filter(({ id: id1 }, i, arr) => arr.findIndex(({ id: id2 }) => id2 === id1) === i);
    const edges: FlowType["edges"] = props.references
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
        [] as FlowType["edges"],
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
    <>
      <Head>
        <title>Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={clsx(
          "h-screen",
          ["flex"],
        )}
      >
        <MouseFocusContext.Provider value={{ focus, setFocus }}>
          <div
            className={clsx(
              ["w-72"],
              ["shadow-lg"],
            )}
          >
            <MaterialsList focus={focus} materials={listData} />
          </div>
          <div
            className={clsx(
              [["flex-grow"], ["flex-shrink-0"]],
              ["h-full"],
            )}
          >
            <Flow focus={focus} data={flowData} />
          </div>
        </MouseFocusContext.Provider>
      </main>
    </>
  );
};

export default Page;
