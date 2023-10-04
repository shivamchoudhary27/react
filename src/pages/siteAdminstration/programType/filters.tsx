import React, { useState } from "react";
import { useFormik } from "formik";
import MobileFilters from "./view/mobile/filters";
import BrowserFilters from "./view/browser/filters";
import { isMobile, isDesktop } from "react-device-detect";
import { filterConfig } from "../../../utils/filterTimeout";

type Props = {
  apiStatus: string;
  programtypePermissions: any;
  openAddProgramType: () => void;
  updateinputfilters: (params: string) => void;
};

interface Type_InitialValues {
  name: string;
}

const initialValues: Type_InitialValues = {
  name: "",
};

const Filter: React.FunctionComponent<Props> = ({ ...props }: Props) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: Type_InitialValues) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      props.updateinputfilters(values.name);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
      });
      props.updateinputfilters(initialValues.name);
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId: NodeJS.Timeout = setTimeout(() => {
      props.updateinputfilters(event.target.value);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  // common reusable props === >>>
  const CommonProps = {
    formik: formik,
    apiStatus: props.apiStatus,
    programtypePermissions: props.programtypePermissions,
    handleFilterChange: handleFilterChange,
    openAddProgramType: props.openAddProgramType,
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileFilters CommonProps={CommonProps} />
      ) : isDesktop ? (
        <BrowserFilters CommonProps={CommonProps} />
      ) : (
        <BrowserFilters CommonProps={CommonProps} />
      )}
    </React.Fragment>
  );
};

export default Filter;
