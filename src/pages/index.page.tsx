import clsx from "clsx";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import React, { useContext, useMemo, useState } from "react";

import { Flow } from "~/components/Flow";

import { MouseFocusContext } from "../components/MouseFocusContext";

export const getStaticProps: GetStaticProps<
  {
    id: string;
    title: string;
    type: { tag: "BOOK"; cover: string | null };
    relations: {
      edges: {
        cursor: string;
        node: {
          id: string;
          type:
            | { tag: "REFER" }
            | { tag: "UPDATE" }
            | { tag: "TRANSLATE"; lang: string };
          from: { id: string };
          to: {
            id: string;
            title: string;
            type: { tag: "BOOK"; cover: string | null };
            relations: {
              edges: {
                cursor: string;
                node: {
                  id: string;
                  type:
                    | { tag: "REFER" }
                    | { tag: "UPDATE" }
                    | { tag: "TRANSLATE"; lang: string };
                  from: { id: string };
                  to: {
                    id: string;
                    title: string;
                    type: { tag: "BOOK"; cover: string | null };
                  };
                };
              }[];
            };
          };
        };
      }[];
    };
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
      relations: {
        edges: [
          {
            cursor: "1",
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
                relations: {
                  edges: [
                    {
                      cursor: "1.1",
                      node: {
                        id: "5b32d003-9f86-4d27-967e-a10438a29950",
                        type: { tag: "REFER" },
                        from: { id: "42b21823-3e33-4c71-9cd1-36f0bc7ffda8" },
                        to: {
                          id: "a8bd789b-67b7-4bf7-9aca-7d6554c265db",
                          title: "計算論 計算可能性とラムダ計算",
                          type: {
                            tag: "BOOK",
                            cover: null,
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          {
            cursor: "2",
            node: {
              id: "6ad32316-fef5-4904-8a21-09ddd673319a",
              type: { tag: "REFER" },
              from: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
              to: {
                id: "189a4fb2-a80a-41b4-9bff-b5e4e7ac1d6f",
                title: "プログラム検証論",
                type: {
                  tag: "BOOK",
                  cover: "https://cover.openbd.jp/9784320026582.jpg",
                },
                relations: {
                  edges: [],
                },
              },
            },
          },
          {
            cursor: "3",
            node: {
              id: "d4b806f2-e5dc-4e9f-9ddf-b25584405dbe",
              type: { tag: "REFER" },
              from: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
              to: {
                id: "53fedbd2-c358-40ae-8da6-b3a0103313c2",
                title: "プログラミング言語の基礎理論",
                type: {
                  tag: "BOOK",
                  cover: "https://cover.openbd.jp/9784320026599.jpg",
                },
                relations: {
                  edges: [
                    {
                      cursor: "3.1",
                      node: {
                        id: "f15a1c83-383c-4b01-b043-ea1877d85dc0",
                        type: { tag: "UPDATE" },
                        from: {
                          id: "53fedbd2-c358-40ae-8da6-b3a0103313c2",
                        },
                        to: {
                          id: "a1c04346-5fb6-48bd-b5ac-1d218d4f97ac",
                          title: "新装版 プログラミング言語の基礎理論",
                          type: {
                            tag: "BOOK",
                            cover: "https://cover.openbd.jp/9784320124509.jpg",
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          {
            cursor: "4",
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
                relations: {
                  edges: [],
                },
              },
            },
          },
          {
            cursor: "5",
            node: {
              id: "cdb562fe-88a4-433d-9ece-2395ca90e540",
              type: { tag: "REFER" },
              from: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
              to: {
                id: "a8bd789b-67b7-4bf7-9aca-7d6554c265db",
                title: "計算論 計算可能性とラムダ計算",
                type: {
                  tag: "BOOK",
                  cover: null,
                },
                relations: {
                  edges: [],
                },
              },
            },
          },
          {
            cursor: "6",
            node: {
              id: "c4fb0c99-21b3-4686-b9ba-9e54ca990fb4",
              type: { tag: "REFER" },
              from: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
              to: {
                id: "981ecdfd-5b16-43bd-b0af-0b006e0ff981",
                title: "論理とプログラム意味論",
                type: {
                  tag: "BOOK",
                  cover: null,
                },
                relations: {
                  edges: [],
                },
              },
            },
          },
          {
            cursor: "7",
            node: {
              id: "97c1c71e-c36b-450b-b66f-82fcb306dd42",
              type: { tag: "REFER" },
              from: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
              to: {
                id: "cd249629-5cd6-48ea-9581-7b216484a9ed",
                title: "アルゴリズムとプログラミング言語",
                type: {
                  tag: "BOOK",
                  cover: null,
                },
                relations: {
                  edges: [],
                },
              },
            },
          },
          {
            cursor: "8",
            node: {
              id: "d93fb267-312d-479d-b5e1-122bee93ce19",
              type: { tag: "REFER" },
              from: { id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0" },
              to: {
                id: "689b4c40-cdd9-44c0-b26a-361ee0d07282",
                title: "The Formal Semantics of Programming Languages",
                type: {
                  tag: "BOOK",
                  cover: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2627/9780262731034.jpg",
                },
                relations: {
                  edges: [],
                },
              },
            },
          },
          {
            cursor: "9",
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
                relations: {
                  edges: [
                    {
                      cursor: "9.1",
                      node: {
                        id: "c1fe5756-d1ad-47c2-b978-1757585b40c8",
                        type: { tag: "TRANSLATE", lang: "ja" },
                        from: { id: "ef993db3-6df3-48f9-ab23-dc64e2ae8a87" },
                        to: {
                          id: "d1d43a80-a3ca-4338-bbb6-29aeb4f915bb",
                          title: "型システム入門 プログラミング言語と型の理論",
                          type: {
                            tag: "BOOK",
                            cover: "https://cover.openbd.jp/9784274069116.jpg",
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const materials: {
    id: string;
    title: string;
  }[] = useMemo(() => {
    return [
      {
        id: props.id,
        title: props.title,
      },
      ...props.relations.edges.map(({ node }) => ({
        id: node.to.id,
        title: node.to.title,
      })),
    ];
  }, [props]);

  const flowdata = useMemo(
    () => {
      const combined: {
        id: string;
        title: string;
        thumbnail: string | null;
        nest: number[];
        relation: {
          id: string;
          from: string;
          to: string;
          type:
            | { tag: "REFER" }
            | { tag: "UPDATE" }
            | { tag: "TRANSLATE"; lang: string };
        };
      }[] = props.relations.edges
        .map(({ node: rel1 }, i) => [
          {
            id: rel1.to.id,
            title: rel1.to.title,
            thumbnail: rel1.to.type.tag === "BOOK" ? rel1.to.type.cover : null,
            nest: [0, i],
            relation: { id: rel1.id, type: rel1.type, from: rel1.from.id, to: rel1.to.id },
          },
          ...rel1.to.relations.edges.map(({ node: rel2 }, j) => ({
            id: rel2.to.id,
            title: rel2.to.title,
            thumbnail: rel2.to.type.tag === "BOOK" ? rel2.to.type.cover : null,
            relation: { id: rel2.id, type: rel2.type, from: rel2.from.id, to: rel2.to.id },
            nest: [0, i, j],
          })),
        ])
        .reduce((p, c) => [...p, ...c], [])
        .sort(({ nest: nestA }, { nest: nestB }) => nestA.length - nestB.length);

      const nodes: {
        id: string;
        title: string;
        thumbnail: string | null;
        nest: number[];
      }[] = [
        {
          id: props.id,
          title: props.title,
          thumbnail: props.type.cover,
          nest: [0],
        },
        ...combined.map(({ id, title, thumbnail, nest }) => ({
          id,
          title,
          thumbnail,
          nest,
        })),
      ].filter(({ id }, i, arr) => arr.findIndex(({ id: id2 }) => id2 === id) === i);

      const edges: {
        id: string;
        from: string;
        to: string;
        type:
          | { tag: "REFER" }
          | { tag: "UPDATE" }
          | { tag: "TRANSLATE"; lang: string };
      }[] = combined.map(({ relation }) => ({
        id: relation.id,
        from: relation.from,
        to: relation.to,
        type: relation.type,
      }));
      return ({ nodes, edges });
    },
    [props],
  );

  const [focus, setFocus] = useState<string | null>(null);

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
        <MouseFocusContext.Provider
          value={{
            focus,
            setFocus(to) {
              setFocus(to);
            },
          }}
        >
          <div
            className={clsx(
              ["w-96"],
              ["shadow-lg"],
            )}
          >
            <Materials
              classNames={clsx(["h-full"])}
              materials={materials}
              focus={focus}
            />
          </div>
          <div
            className={clsx(
              [["flex-grow"], ["flex-shrink-0"]],
              ["h-full"],
            )}
          >
            <Flow focus={focus} data={flowdata} />
          </div>
        </MouseFocusContext.Provider>
      </main>
    </>
  );
};

export const Materials: React.FC<{
  classNames?: string;
  focus: string | null;
  materials: { id: string; title: string }[];
}> = ({ classNames, materials }) => {
  const { focus, setFocus } = useContext(MouseFocusContext);

  return (
    <div className={clsx(classNames, ["divide-y"], ["bg-slate-50"])}>
      {materials.map(({ id, title }) => (
        <div
          key={id}
          className={clsx(
            ["bg-white"],
            ["px-4"],
            ["py-4"],
            focus === id && [
              "bg-teal-200",
            ],
          )}
          onMouseEnter={() => {
            setFocus(id);
          }}
          onMouseLeave={() => {
            if (focus === id) setFocus(null);
          }}
        >
          <div className={clsx(["text-sm"])}>{title}</div>
        </div>
      ))}
    </div>
  );
};

export default Page;
