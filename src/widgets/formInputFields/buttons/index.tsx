import { Button, Spinner } from "react-bootstrap";

interface ICustomButton {
  variant?: string | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  isSubmitting?: boolean | undefined;
  btnText: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: any
}

const CustomButton: React.FunctionComponent<ICustomButton> = ({
  variant,
  type,
  isSubmitting,
  btnText,
  onClick,
  disabled
}: ICustomButton) => {
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={isSubmitting ? isSubmitting : disabled}
    >
      {btnText}
    </Button>
  );
};

interface ILoadingButton {
  variant?: string | undefined;
  btnText?: string | undefined;
  className?: string | undefined;
  status?: string | undefined;
}

export const LoadingButton: React.FunctionComponent<ILoadingButton> = ({
  variant = "primary",
  btnText,
  className,
  status,
}: ILoadingButton) => {
  return (
    <>
      {status !== "filterLoader" ? (
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
      ) : (
        <Spinner
          as="span"
          variant="light"
          size="sm"
          role="status"
          aria-hidden="true"
          animation="border"
          className="me-1"
        />
      )}
    </>
  );
};

export default CustomButton;
