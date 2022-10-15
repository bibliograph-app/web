import clsx from "clsx";
import React, { useContext, useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  MarkerType,
  NodeProps,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";

import { MouseFocusContext } from "~/components/MouseFocusContext";

export const MaterialNode: React.FC<
  NodeProps<{
    title: string;
    thumbnail: string | null;
  }>
> = ({
  id,
  data: {
    title,
    thumbnail,
  },
}) => {
  const { focus, setFocus } = useContext(MouseFocusContext);
  const focusing = useMemo(() => focus === id, [focus, id]);
  return (
    <>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} />
      <div
        className={clsx(
          ["w-24"],
          ["h-28"],
          ["p-2"],
          "border",
          {
            "bg-white": !focusing,
            "bg-teal-200": focusing,
          },
          ["rounded-md"],
        )}
        onMouseEnter={() => {
          setFocus(id);
        }}
        onMouseLeave={() => {
          if (focusing) setFocus(null);
        }}
      >
        {thumbnail && (
          <img
            className={clsx(
              ["mx-auto"],
              ["h-full"],
            )}
            src={thumbnail}
          >
          </img>
        )}
        {!thumbnail && (
          <div className={clsx(["text-xs"], ["leading-tight"])}>
            {title}
          </div>
        )}
      </div>
    </>
  );
};

export const calcPosition = (nest: number[]) => {
  if (nest.length === 1) {
    return { y: 0, x: 0 };
  } else if (nest.length === 2) {
    return { y: 200, x: nest[1] * 128 };
  } else {
    return {};
  }
};

export const Flow: React.FC<{
  nodes: {
    id: string;
    title: string;
    thumbnail: string | null;
    nest: number[];
  }[];
  edges: {
    id: string;
    from: string;
    to: string;
    type:
      | { tag: "REFER" }
      | { tag: "UPDATE" }
      | { tag: "TRANSLATE"; lang: string };
  }[];
}> = ({ nodes: initNodes, edges: initEdges }) => {
  const nodeTypes = useMemo(() => ({ material: MaterialNode }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState<{ title: string; thumbnail: string | null }>([]);
  useEffect(() => {
    setNodes(initNodes.map(({ id, title, thumbnail, nest }) => {
      const position = nest.length === 1
        ? { x: 0, y: 0 }
        : (nest.length === 2
          ? { x: nest[1] * 128, y: 192 }
          : { x: nest[1] * 128 + 16, y: 384 });
      return ({
        id,
        type: "material",
        position,
        connectable: false,
        data: { title, thumbnail },
      });
    }));
  }, [initNodes, setNodes]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  useEffect(() => {
    setEdges(
      initEdges.map(({ id, from, to, type }) => ({
        id,
        source: from,
        target: to,
        label: type.tag,
        markerEnd: { type: MarkerType.ArrowClosed },
      })),
    );
  }, [initEdges, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};
