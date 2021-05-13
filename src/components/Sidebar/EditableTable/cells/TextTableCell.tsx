import React, { useState } from "react";
import { StyledInput } from "./sharedStyles";

export type TextTableCellProps = {
  value: string;
  onBlur: (newValue: string) => boolean;
};

export default function TextTableCell(
  props: TextTableCellProps
): React.ReactElement {
  const [displayVal, setDisplayVal] = useState<string>(props.value);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newVal = event.target.value;
    if (newVal === undefined) {
      setDisplayVal("");
    } else {
      setDisplayVal(newVal);
    }
  }

  function handleOnBlur(event: React.ChangeEvent<HTMLInputElement>) {
    const newVal = event.target.value;
    if (newVal !== undefined && newVal !== props.value) {
      const updateOk = props.onBlur(newVal);
      if (!updateOk) {
        setDisplayVal(props.value);
      }
    } else {
      const updateOk = props.onBlur(props.value);
      if (!updateOk) {
        setDisplayVal(props.value);
      }
    }
  }

  return (
    <StyledInput
      type="text"
      value={displayVal}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  );
}
