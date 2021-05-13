import React from "react";
import BooleanTableCell, { BooleanTableCellProps } from "./BooleanTableCell";
import { Story, Meta } from "@storybook/react";

const Template: Story<BooleanTableCellProps> = (args) => (
  <BooleanTableCell {...args} />
);

export default {
  title: "Editable Table/BooleanTableCell",
  component: BooleanTableCell,
} as Meta;

export const EmptyBooleanTableCell = Template.bind({});
EmptyBooleanTableCell.args = {
  isActive: false,
  onClick: (n: boolean) => {
    console.log(n);
  },
  showWhenActive: "",
};

export const PopulatedBooleanTableCell = Template.bind({});
PopulatedBooleanTableCell.args = {
  isActive: true,
  onClick: (n: boolean) => {
    console.log(n);
  },
  showWhenActive: "✅",
};
