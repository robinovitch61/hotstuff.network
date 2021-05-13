import React, { useCallback, useState } from "react";
import styled from "styled-components/macro";

const StyledCheckbox = styled.div`
  display: inline-flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

export type BooleanTableCellProps = {
  isActive: boolean;
  onClick: (newIsActive: boolean) => void;
  showWhenActive: string;
};

export default function BooleanTableCell(
  props: BooleanTableCellProps
): React.ReactElement {
  return (
    <StyledCheckbox
      tabIndex={0}
      onKeyUp={(event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
          props.onClick(!props.isActive);
        }
      }}
      onClick={() => {
        props.onClick(!props.isActive);
      }}
    >
      &nbsp;{props.isActive ? props.showWhenActive : ""}
    </StyledCheckbox>
  );
}
