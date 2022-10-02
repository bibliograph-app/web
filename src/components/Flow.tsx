import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Handle,
  MarkerType,
  MiniMap,
  NodeProps,
  NodeTypes,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";

export const MaterialNode: React.FC<
  NodeProps<{
    title: string;
    cover: string | null;
  }>
> = ({
  data: {
    title,
    cover,
  },
}) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div
        className={clsx(
          ["w-24"],
          "border",
          ["bg-white"],
          ["p-2"],
        )}
      >
        {cover && <img className={clsx([])} src={cover}></img>}
        {!cover && (
          <div
            className={clsx(
              ["text-xs"],
              ["leading-tight"],
            )}
          >
            {title}
          </div>
        )}
      </div>
    </>
  );
};

export const Flow: React.FC<{}> = ({}) => {
  const nodeTypes = useMemo<NodeTypes>(() => ({
    material: MaterialNode,
  }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState<{
    title: string;
    cover: string | null;
  }>([
    {
      id: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
      position: { x: 0, y: -60 },
      type: "material",
      data: {
        title: "プログラミング言語の基礎概念",
        cover: "https://cover.openbd.jp/9784781912851.jpg",
      },
    },
    {
      id: "42b21823-3e33-4c71-9cd1-36f0bc7ffda8",
      type: "material",
      position: { x: 0, y: 160 },
      data: {
        title: "プログラム意味論",
        cover: "https://cover.openbd.jp/9784320026575.jpg",
      },
    },
    {
      id: "189a4fb2-a80a-41b4-9bff-b5e4e7ac1d6f",
      type: "material",
      position: { x: 100, y: 160 },
      data: {
        title: "プログラム検証論",
        cover: "https://cover.openbd.jp/9784320026582.jpg",
      },
    },
    {
      id: "53fedbd2-c358-40ae-8da6-b3a0103313c2",
      type: "material",
      position: { x: 200, y: 160 },
      data: {
        title: "プログラミング言語の基礎理論",
        cover: "https://cover.openbd.jp/9784320026599.jpg",
      },
    },
    {
      id: "a1c04346-5fb6-48bd-b5ac-1d218d4f97ac",
      type: "material",
      position: { x: 200, y: 320 },
      data: {
        title: "新装版 プログラミング言語の基礎理論",
        cover: "https://cover.openbd.jp/9784320124509.jpg",
      },
    },
    {
      id: "fae83103-432a-428f-b809-6331b41cb482",
      type: "material",
      position: { x: 300, y: 160 },
      data: {
        title: "論理と計算のしくみ",
        cover: "https://cover.openbd.jp/9784000061919.jpg",
      },
    },
    {
      id: "cb6e5656-811c-46a8-ac15-54239df5ff3c",
      type: "material",
      position: { x: 400, y: 160 },
      data: {
        title: "計算論 計算可能性とラムダ計算",
        cover: null,
      },
    },
    {
      id: "981ecdfd-5b16-43bd-b0af-0b006e0ff981",
      type: "material",
      position: { x: 500, y: 160 },
      data: {
        title: "論理とプログラム意味論",
        cover: null,
        //  cover: "https://cover.openbd.jp/9784000061902.jpg",
      },
    },
    {
      id: "cd249629-5cd6-48ea-9581-7b216484a9ed",
      type: "material",
      position: { x: 600, y: 160 },
      data: {
        title: "アルゴリズムとプログラミング言語",
        cover: null,
        // cover: "https://cover.openbd.jp/9784000050067.jpg",
      },
    },
    {
      id: "689b4c40-cdd9-44c0-b26a-361ee0d07282",
      type: "material",
      position: { x: 700, y: 160 },
      data: {
        title: "The Formal Semantics of Programming Languages",
        // temp
        cover: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2627/9780262731034.jpg",
      },
    },
    {
      id: "ef993db3-6df3-48f9-ab23-dc64e2ae8a87",
      type: "material",
      position: { x: 800, y: 160 },
      data: {
        title: "Types and Programming Languages",
        cover: "https://covers.openlibrary.org/b/isbn/9780262162098-L.jpg",
      },
    },
    {
      id: "d1d43a80-a3ca-4338-bbb6-29aeb4f915bb",
      type: "material",
      position: { x: 800, y: 320 },
      data: {
        title: "型システム入門 プログラミング言語と型の理論",
        cover: "https://cover.openbd.jp/9784274069116.jpg",
      },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    [
      {
        id: "e1_1",
        source: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
        target: "42b21823-3e33-4c71-9cd1-36f0bc7ffda8",
        label: "参照",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e1_2",
        source: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
        target: "189a4fb2-a80a-41b4-9bff-b5e4e7ac1d6f",
        label: "参照",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e1_3",
        source: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
        target: "53fedbd2-c358-40ae-8da6-b3a0103313c2",
        label: "参照",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e1_4",
        source: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
        target: "cb6e5656-811c-46a8-ac15-54239df5ff3c",
        label: "参照",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e1_5",
        source: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
        target: "fae83103-432a-428f-b809-6331b41cb482",
        label: "参照",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e1_6",
        source: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
        target: "981ecdfd-5b16-43bd-b0af-0b006e0ff981",
        label: "参照",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e1_7",
        source: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
        target: "cd249629-5cd6-48ea-9581-7b216484a9ed",
        label: "参照",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e1_8",
        source: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
        target: "689b4c40-cdd9-44c0-b26a-361ee0d07282",
        label: "参照",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e1_9",
        source: "4e96602b-ebe2-4204-87f1-ddd6144b82e0",
        target: "ef993db3-6df3-48f9-ab23-dc64e2ae8a87",
        label: "参照",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e2_1",
        source: "53fedbd2-c358-40ae-8da6-b3a0103313c2",
        target: "a1c04346-5fb6-48bd-b5ac-1d218d4f97ac",
        label: "改訂",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
      {
        id: "e3_1",
        source: "ef993db3-6df3-48f9-ab23-dc64e2ae8a87",
        target: "d1d43a80-a3ca-4338-bbb6-29aeb4f915bb",
        label: "日本語への翻訳",
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      },
    ],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
    >
      <Controls></Controls>
      <Background></Background>
    </ReactFlow>
  );
};
