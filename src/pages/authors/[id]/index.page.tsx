import clsx from "clsx";
import { GraphQLClient } from "graphql-request";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { graphql } from "~/gql";

const fetchAuthorsPagePathsQueryDocument = graphql(`
  query fetchAuthorsPagePaths {
    authors {
      id
    }
  }
`);

const fetchAuthorsPageQueryDocument = graphql(`
  query fetchAuthorsPage($id: ID!) {
    author(id: $id) {
      id
      name
      authorships {
        roles
        material {
          id
          title
          cover
        }
      }
    }
  }
`);

export const getStaticPaths: GetStaticPaths<{
  id: string;
}> = async () => {
  const client = new GraphQLClient("http://localhost:4000/graphql");
  const { authors } = await client.request(fetchAuthorsPagePathsQueryDocument);

  return {
    paths: authors.map(({ id }) => ({
      params: { id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  {
    id: string;
    name: string;
    authorships: {
      material: { id: string; title: string; cover: string | null };
    }[];
  },
  { id: string }
> = async ({ params }) => {
  if (!params) return { notFound: true };

  const client = new GraphQLClient("http://localhost:4000/graphql");
  const { author } = await client.request(fetchAuthorsPageQueryDocument, { id: params.id });

  return {
    props: {
      id: author.id,
      name: author.name,
      authorships: author.authorships.map(({ material }) => ({
        material: {
          id: material.id,
          title: material.title,
          cover: material.cover || null,
        },
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
      <main>
        {props.id}
        <span>{props.name}</span>
        <div className={clsx(["flex"])}>
          {props.authorships.map(({ material }) => (
            <Link
              key={material.id}
              href={{ pathname: "/materials/[id]", query: { id: material.id } }}
            >
              <a className={clsx(["block"])}>
                {material.cover && (
                  <Image
                    src={material.cover}
                    width={192}
                    height={192}
                    objectFit="scale-down"
                    alt={`image of ${material.title}`}
                  />
                )}
                {!material.cover && (
                  <div>
                    <span>{material.title}</span>
                  </div>
                )}
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Page;
