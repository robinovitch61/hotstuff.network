import React, { useState } from "react";
import styled from "styled-components/macro";
import config from "../../../config";
import { AppNode } from "../../App";
import BooleanTableCell from "./cells/BooleanTableCell";
import NumericalTableCell from "./cells/NumericalTableCell";
import TextTableCell from "./cells/TextTableCell";

type SortDirection = "ASC" | "DESC";
type SortState<T> = { key: keyof T; direction: SortDirection };

const StyledTableWrapper = styled.div`
  width: 100%;
`;

const StyledTable = styled.div`
  width: 100%;
  border-collapse: collapse;
`;

const StyledHeaderWrapper = styled.div<{ heightOffsetPx?: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  position: sticky;
  top: ${({ heightOffsetPx }) =>
    heightOffsetPx ? `${heightOffsetPx}px` : "0px"};
  z-index: 1;
`;

const StyledColHeader = styled.div<{ width: number; minWidth?: number }>`
  display: inline-flex;
  width: ${({ width }) => `${width * 100}%`};
  min-width: ${({ minWidth }) => (!!minWidth ? `${minWidth}px` : "none")};
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: 1px solid lightgrey;
  cursor: pointer;
  user-select: none;
  position: relative;
  background: white;
  border-bottom: 1px solid black;
`;

const StyledColText = styled.div`
  font-size: 0.8em;
  padding: 1em;
`;

const StyledSortIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translate(50%);
`;

const StyledRow = styled.div<{ heightOffsetPx?: number }>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  position: sticky;
  top: ${({ heightOffsetPx }) =>
    heightOffsetPx ? `${heightOffsetPx}px` : "0px"};
`;

const StyledTableBody = styled.div`
  width: 100%;
`;

const StyledCell = styled.div<{ width: number; minWidth?: number }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  height: 2em;
  width: ${({ width }) => `${width * 100}%`};
  min-width: ${({ minWidth }) => (!!minWidth ? `${minWidth}px` : "none")};
`;

const StyledDeleteCell = styled(StyledCell)`
  cursor: pointer;

  &:hover {
    background: black;
  }
`;

const defaultNodeSortState: SortState<AppNode> = {
  key: "name",
  direction: "ASC",
};

export type NodeTableProps = {
  nodes: AppNode[];
  updateNode: (row: AppNode) => void;
  deleteNode: (nodeId: string) => void;
};

function oppositeSortDirection(sortDirection: SortDirection): SortDirection {
  return sortDirection === "ASC" ? "DESC" : "ASC";
}

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

  function updateSortState(colKey: keyof AppNode): void {
    const isSortedCol = sortState.key === colKey;
    setSortState((prevSortState) => ({
      key: colKey,
      direction:
        !isSortedCol || !prevSortState.direction
          ? "ASC"
          : oppositeSortDirection(prevSortState.direction),
    }));
  }

  function getSortIcon(colKey: keyof AppNode): string {
    const isSortedCol = sortState.key === colKey;
    const sortIcon = sortState.direction === "ASC" ? "\u25B2" : "\u25BC";
    return isSortedCol ? sortIcon : "";
  }

  function isUniqueName(name: string): boolean {
    return !props.nodes.some((node) => node.name === name);
  }

  const tableRows = [...props.nodes].sort(sortByState).map((node) => {
    return (
      <StyledRow key={node.id} heightOffsetPx={config.tabHeightPx}>
        <StyledCell width={0.2} minWidth={100}>
          <TextTableCell
            value={node.name}
            onBlur={(newName) => {
              const trimmedNewName = newName.trim();
              if (trimmedNewName === "") {
                return false;
              }
              if (isUniqueName(trimmedNewName)) {
                props.updateNode({ ...node, name: trimmedNewName });
                return true;
              } else if (trimmedNewName !== node.name) {
                alert(`Name ${trimmedNewName} is already in use.`);
              }
              return false;
            }}
          />
        </StyledCell>
        <StyledCell width={0.2} minWidth={100}>
          <NumericalTableCell
            initialVal={node.temperatureDegC}
            onBlur={(newTemp) =>
              props.updateNode({ ...node, temperatureDegC: newTemp })
            }
          />
        </StyledCell>
        <StyledCell width={0.2} minWidth={100}>
          <NumericalTableCell
            initialVal={node.capacitanceJPerDegK}
            onBlur={(newCap) =>
              props.updateNode({ ...node, capacitanceJPerDegK: newCap })
            }
          />
        </StyledCell>
        <StyledCell width={0.15} minWidth={80}>
          <NumericalTableCell
            initialVal={node.powerGenW}
            onBlur={(newPow) =>
              props.updateNode({ ...node, powerGenW: newPow })
            }
          />
        </StyledCell>
        <StyledCell width={0.15} minWidth={80}>
          <BooleanTableCell
            isActive={node.isBoundary}
            onClick={(newIsBoundary) =>
              props.updateNode({ ...node, isBoundary: newIsBoundary })
            }
            showWhenActive={"✅"}
          />
        </StyledCell>
        <StyledDeleteCell
          width={0.1}
          minWidth={50}
          onClick={() => props.deleteNode(node.id)}
        >
          ❌
        </StyledDeleteCell>
      </StyledRow>
    );
  });

  return (
    <StyledTableWrapper>
      <StyledTable>
        <StyledHeaderWrapper heightOffsetPx={config.tabHeightPx}>
          <StyledColHeader
            onClick={() => updateSortState("name")}
            width={0.2}
            minWidth={100}
          >
            <StyledColText>Name</StyledColText>
            <StyledSortIcon>{getSortIcon("name")}</StyledSortIcon>
          </StyledColHeader>
          <StyledColHeader
            onClick={() => updateSortState("temperatureDegC")}
            width={0.2}
            minWidth={100}
          >
            <StyledColText>Temp degC</StyledColText>
            <StyledSortIcon>{getSortIcon("temperatureDegC")}</StyledSortIcon>
          </StyledColHeader>
          <StyledColHeader
            onClick={() => updateSortState("capacitanceJPerDegK")}
            width={0.2}
            minWidth={100}
          >
            <StyledColText>Capacitance J/degK</StyledColText>
            <StyledSortIcon>
              {getSortIcon("capacitanceJPerDegK")}
            </StyledSortIcon>
          </StyledColHeader>
          <StyledColHeader
            onClick={() => updateSortState("powerGenW")}
            width={0.15}
            minWidth={80}
          >
            <StyledColText>Power Gen W</StyledColText>
            <StyledSortIcon>{getSortIcon("powerGenW")}</StyledSortIcon>
          </StyledColHeader>
          <StyledColHeader
            onClick={() => updateSortState("isBoundary")}
            width={0.15}
            minWidth={80}
          >
            <StyledColText>Boundary?</StyledColText>
            <StyledSortIcon>{getSortIcon("isBoundary")}</StyledSortIcon>
          </StyledColHeader>
          <StyledColHeader
            width={0.1}
            minWidth={50}
            style={{ cursor: "unset" }}
          >
            <StyledColText>Delete</StyledColText>{" "}
          </StyledColHeader>
        </StyledHeaderWrapper>

        <StyledTableBody>{tableRows}</StyledTableBody>
      </StyledTable>
    </StyledTableWrapper>
  );
}
