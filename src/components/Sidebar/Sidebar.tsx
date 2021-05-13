import * as React from "react";
import styled from "styled-components/macro";
import { AppNode } from "../App";
import NodeTable from "./EditableTable/NodeTable";
import Tabs from "../Tabs/Tabs";
import ModelControls from "./ModelControls";

const StyledEditor = styled.div<{ width: number; height: number }>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border-left: 3px solid black;
`;

const StyledTables = styled.div`
  display: inline-flex;
  width: 100%;
  height: 50%;
`;

const StyledModelControlsWrapper = styled.div`
  display: inline-flex;
  width: 100%;
`;

type EditorProps = {
  width: number;
  height: number;
  nodes: AppNode[];
  addNode: (node: AppNode) => void;
  deleteNodes: (nodeIds: string[]) => void;
  updateNodes: (nodes: AppNode[]) => void;
  updateActiveNodes: (nodeIds: string[], sticky: boolean) => void;
  clearActiveNodes: () => void;
};

export default function Sidebar(props: EditorProps): React.ReactElement {
  const nodeTable = (
    <NodeTable
      rows={props.nodes}
      onUpdateRow={(node: AppNode) => props.updateNodes([node])}
      onDeleteRow={(node: AppNode) => props.deleteNodes([node.id])}
    />
  );
  return (
    <StyledEditor width={props.width} height={props.height}>
      <StyledTables>
        <Tabs
          tabs={[
            { text: "Nodes", component: nodeTable, width: 0.5 },
            { text: "Connections", component: <h1>hi</h1>, width: 0.5 },
          ]}
        />
      </StyledTables>
      <StyledModelControlsWrapper>
        <ModelControls onRunModel={() => alert("run!")} />
      </StyledModelControlsWrapper>
    </StyledEditor>
  );
}