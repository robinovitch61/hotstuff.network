import React from "react";
import TextTableCell, { TextTableCellProps } from "./TextTableCell";
import { Story, Meta } from "@storybook/react";

const Template: Story<TextTableCellProps> = (args) => (
  <TextTableCell {...args} />
);

export default {
  title: "Editable Table/TextTableCell",
  component: TextTableCell,
} as Meta;

export const EmptyTextTableCell = Template.bind({});
EmptyTextTableCell.args = {
  value: undefined,
  onBlur: (newVal) => true,
};

export const PopulatedTextTableCell = Template.bind({});
PopulatedTextTableCell.args = {
  value: "some val",
  onBlur: (newVal) => true,
};
