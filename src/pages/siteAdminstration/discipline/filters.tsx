import { useFormik } from "formik";
import React, { useState } from "react";
import MobileFilters from "./view/mobile/filters";
import BrowserFilters from "./view/browser/filters";
import { isMobile, isDesktop } from "react-device-detect";
import { filterConfig } from "../../../utils/filterTimeout";

type Type_InitialValues = {
  name: string;
};

type props = {
  apiStatus: string;
  disciplinePermissions: any;
  openAddDiscipline: (params: boolean) => void;
  updateInputFilters: (params: string) => void;
};

const initialValues: Type_InitialValues = {
  name: "",
};

const Filters: React.FunctionComponent<props> = ({ ...props }: props) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: Type_InitialValues) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      props.updateInputFilters(values.name);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
      });
      props.updateInputFilters(initialValues.name);
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event: any) => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      props.updateInputFilters(event.target.value);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  const commonProps = {
    formik: formik,
    apiStatus: props.apiStatus,
    disciplinePermissions: props.disciplinePermissions,
    handleFilterChange: handleFilterChange,
    openAddDiscipline: props.openAddDiscipline,
  };
  
  return (
    <React.Fragment>
      {isMobile ? (
        <MobileFilters commonProps={commonProps} />
      ) : isDesktop ? (
        <BrowserFilters commonProps={commonProps} />
      ) : (
        <BrowserFilters commonProps={commonProps} />
      )}
    </React.Fragment>
  );
};

export default Filters;
