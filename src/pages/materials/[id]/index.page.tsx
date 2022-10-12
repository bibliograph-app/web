import { GraphQLClient } from "graphql-request";
import { GetStaticPaths, GetStaticProps } from "next";
import { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";

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

export const getStaticProps: GetStaticProps<{
  id: string;
  title: string;
  isbn13: string | null;
}, { id: string }> = async ({ params }) => {
  if (!params) return { notFound: true };

  const client = new GraphQLClient("http://localhost:4000/graphql");
  const { material } = await client.request(fetchMaterialPageQueryDocument, { id: params.id });

  return {
    props: {
      id: material.id,
      title: material.title,
      isbn13: material.isbn13 || null,
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <>
      <Head>
        <title>Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Page;
