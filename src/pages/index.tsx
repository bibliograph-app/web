import clsx from "clsx";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Flow } from "~/components/Flow";

export const getStaticProps: GetStaticProps<
  {
    id: string;
    title: string;
    forwardRelations: {};
  }
> = ({ params }) => {
  return {
    props: {
      id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
      title: "プログラミング言語の基礎概念",
      type: {
        tag: "BOOK",
        cover: "https://cover.openbd.jp/9784781912851.jpg",
      },
      forwardRelations: {
        edges: [
          {
            cursor: "1",
            node: {
              id: "9a899e4f-ab32-4aba-8464-1e8a26fdbe3e",
              type: { tag: "REFER" },
              from: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
              to: {
                id: "fae83103-432a-428f-b809-6331b41cb482",
                title: "論理と計算のしくみ",
                type: {
                  tag: "BOOK",
                  cover: "https://cover.openbd.jp/9784000061919.jpg",
                },
              },
            },
          },
          {
            cursor: "2",
            node: {
              id: "2d85d16c-bc23-4730-abb3-f597c3cb10c3",
              type: { tag: "REFER" },
              from: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
              to: {
                id: "42b21823-3e33-4c71-9cd1-36f0bc7ffda8",
                title: "プログラム意味論",
                type: {
                  tag: "BOOK",
                  cover: "https://cover.openbd.jp/9784320026575.jpg",
                },
              },
            },
          },
          {
            cursor: "3",
            node: {
              id: "66787cf5-a22a-4a2e-9ec8-0310b3616bca",
              type: { tag: "REFER" },
              from: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
              to: {
                id: "cb6e5656-811c-46a8-ac15-54239df5ff3c",
                title: "計算論 計算可能性とラムダ計算",
                type: {
                  tag: "BOOK",
                  cover: null,
                  // cover: "https://covers.openlibrary.org/b/isbn/9784764901841-L.jpg",
                  // cover: "https://cover.openbd.jp/9784764901841.jpg",
                },
              },
            },
          },
          {
            cursor: "4",
            node: {
              id: "5750d6b0-8513-4f12-81cb-af793efd2903",
              type: { tag: "REFER" },
              from: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
              to: {
                id: "ef993db3-6df3-48f9-ab23-dc64e2ae8a87",
                title: "Types and Programming Languages",
                type: {
                  tag: "BOOK",
                  cover: "https://covers.openlibrary.org/b/isbn/9780262162098-L.jpg",
                },
              },
            },
          },
        ],
      },
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
  title,
  forwardRelations,
}) => {
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
        <div className={clsx(["w-full"], ["h-full"])}>
          <Flow />
        </div>
      </main>
    </>
  );
};

export default Page;
