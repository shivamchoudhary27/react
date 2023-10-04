import { Button } from "react-bootstrap";
import { LoadingButton } from "../../widgets/formInputFields/buttons";

export const FiltersLoadingBtn = (apiStatus, type = "submit") => {
  return (
    <>
      <Button variant="primary" type={type} className="me-2">
        {apiStatus !== "finished" ? (
          <LoadingButton status="filterLoader" />
        ) : (
          "Filter"
        )}
      </Button>
    </>
  );
};
