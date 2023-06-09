import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

const TimerAlertBox = ({
  alertMsg,
  variant,
  setShowAlert,
  showAlert,
}: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);

  return (
    <React.Fragment>
      <div>
        {showAlert && (
          <Alert
            style={{textAlign:"center"}}
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
