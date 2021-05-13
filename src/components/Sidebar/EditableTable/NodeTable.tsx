import React, { useState } from "react";
import styled from "styled-components/macro";
import config from "../../../config";
import { AppNode } from "../../App";
import EditableTable, { Column } from "./EditableTable";
import { SortState } from "./SortableTableHeader";
import TextTableCell from "./TextTableCell";

const StyledTableWrapper = styled.div`
  width: 100%;
`;

const StyledTable = styled.div`
  width: 100%;
  border-collapse: collapse;
`;

const StyledRow = styled.div<{ heightOffsetPx?: number }>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  position: sticky;
  top: ${({ heightOffsetPx }) =>
    heightOffsetPx ? `${heightOffsetPx}px` : "0px"};
`;

const defaultNodeSortState: SortState<AppNode> = {
  key: "name",
  direction: "ASC",
};

const nodeColumns: Column<AppNode>[] = [
  {
    text: "Name",
    key: "name",
    width: 0.2,
    minWidthPx: 100,
  },
  {
    text: "Temp degC",
    key: "temperatureDegC",
    width: 0.2,
    minWidthPx: 100,
  },
  {
    text: "Capacitance J/degK",
    key: "capacitanceJPerDegK",
    width: 0.2,
    minWidthPx: 100,
  },
  {
    text: "Power Gen W",
    key: "powerGenW",
    width: 0.15,
    minWidthPx: 80,
  },
  {
    text: "Boundary?",
    key: "isBoundary",
    width: 0.15,
    minWidthPx: 80,
  },
];

export type NodeTableProps = {
  nodes: AppNode[];
  updateNode: (row: AppNode) => void;
  onDeleteRow: (row: AppNode) => void;
};

export default function NodeTable(props: NodeTableProps): React.ReactElement {
  const [sortState, setSortState] = useState<SortState<AppNode>>(
    defaultNodeSortState
  );

  function sortByState(first: AppNode, second: AppNode): number {
    if (first[sortState.key] > second[sortState.key]) {
      return sortState.direction === "ASC" ? 1 : -1;
    } else {
      return sortState.direction === "ASC" ? -1 : 1;
    }
  }

  const tableRows = [...props.nodes].sort(sortByState).map((node) => {
    return (
      <StyledRow key={node.id} heightOffsetPx={config.tabHeightPx}>
        <TextTableCell
          initialVal={node.name}
          onBlur={(newName) => props.updateNode({ ...node, name: newName })}
        />
      </StyledRow>
    );
  });

  return (
    <StyledTableWrapper>
      <StyledTable>
        <StyledColHeader
          key={col.key.toString()}
          onClick={onClick}
          width={col.width}
          minWidth={col.minWidthPx}
        >
          <StyledColText>{col.text}</StyledColText>
          <StyledSortIcon>{isSortedCol ? sortIcon : ""}</StyledSortIcon>
        </StyledColHeader>
        <StyledTableBody>{tableRows}</StyledTableBody>
      </StyledTable>
    </StyledTableWrapper>
  );
}
