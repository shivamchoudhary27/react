import { Button, Spinner } from "react-bootstrap";

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

export const LoadingButton = ({variant="primary", btnText, className}: any) => {
  return (
    <div className={className}>
      <Button variant={variant} disabled>
        <Spinner
          as="span"
          variant="warning"
          size="sm"
          role="status"
          aria-hidden="true"
          animation="border"
          className="me-1"
        />
        {btnText}
      </Button>
    </div>
  );
};

export default CustomButton;
