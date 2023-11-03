import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

interface ITimerAlertBox {
  alertMsg: string;
  variant: string;
  setShowAlert: (params: boolean) => void;
  showAlert: boolean;
  className?: string;
}

const TimerAlertBox: React.FunctionComponent<ITimerAlertBox> = ({
  alertMsg,
  variant,
  setShowAlert,
  showAlert,
}: ITimerAlertBox) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);

  return (
    <React.Fragment>
      <div>
        {showAlert && (
          <Alert
            style={{ textAlign: "center" }}
            variant={variant}
            onClick={() => setShowAlert(false)}
            // dismissible
          >
            {alertMsg}
          </Alert>
        )}
      </div>
    </React.Fragment>
  );
};

export default TimerAlertBox;
