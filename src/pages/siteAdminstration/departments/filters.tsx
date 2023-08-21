import { useFormik } from "formik";
import React, { useState } from "react";
import MobileFilters from "./view/mobile/filters";
import BrowserFilters from "./view/browser/filters";
import { isMobile, isDesktop } from "react-device-detect";
import { filterConfig } from "../../../utils/filterTimeout";

type Type_InitialValues = {
  name: string;
};

type Props = {
  permissions: any;
  refreshDepartmentData?: () => void;
  updateInputFilters: (params: any) => void;
  toggleModalShow: (params: boolean) => void;
  resetDepartmentForm: (params: boolean | null) => void;
}

const initialValues: Type_InitialValues = {
  name: "",
};

const Filters: React.FunctionComponent<Props> = ({
  ...props
}: Props) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: Type_InitialValues) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      let newRequest: Type_InitialValues = {
        name: values.name,
      };
      props.updateInputFilters(newRequest.name);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
      });
      props.updateInputFilters("");
    },
  });

  // Event handler for filter input change with debounce
  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    formik.handleChange(event); // Update formik values

    if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any

    // Set a new timeout to trigger updatefilters after a delay
    const newTimeoutId = setTimeout(() => {
      props.updateInputFilters(event.target.value);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  // handle to open Add Department modal === >>>
  const openAddDepartment = () => {
    props.toggleModalShow(true);
    props.resetDepartmentForm(true);
  };

  // common props ===>>>
  const commonProps = {
    formik: formik,
    permissions: props.permissions,
    openAddDepartment: openAddDepartment,
    handleFilterChange: handleFilterChange,
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
