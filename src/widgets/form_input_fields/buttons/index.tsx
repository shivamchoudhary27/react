import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = ({
  variant,
  type,
  isSubmitting,
  btnText,
  onClick,
}: any) => {
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={isSubmitting}
    >
      {btnText}
    </Button>
  );
};

export default CustomButton;
