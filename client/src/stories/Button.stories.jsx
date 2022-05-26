import React from "react";
import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
    handleClick: { action: "handleClick" },
  },
};

const Template = (args) => <Button {...args} />;

export const JoinRoomButton = Template.bind({});
JoinRoomButton.args = {
  label: "Join Room",
  primary: true,
  size: "medium",
};
