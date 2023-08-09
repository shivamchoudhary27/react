import React, { useState } from "react";
import { useFormik } from "formik";
import { filterConfig } from "../../../utils/filterTimeout";
import { TypeFilter } from "./types/type";
import BrowserFilter from "./view/browser/filter";
import MobileFilter from "./view/mobile/filter";
import { isMobile, isDesktop } from "react-device-detect";

type TypeInitialValues = {
  name: string;
};

const initialValues: TypeInitialValues = {
  name: "",
};

const Filter: React.FunctionComponent<TypeFilter> = ({
  toggleModalShow,
  resetDepartmentForm,
  updateInputFilters,
  permissions,
}: TypeFilter) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: TypeInitialValues) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      let newRequest: TypeInitialValues = {
        name: values.name,
      };
      updateInputFilters(newRequest.name);
    },
    onReset: () => {
      if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout, if any
      formik.setValues({
        name: "",
      });
      updateInputFilters("");
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
      updateInputFilters(event.target.value);
    }, filterConfig.timeoutNumber); // Adjust the delay (in milliseconds) as per your needs

    setTimeoutId(newTimeoutId); // Update the timeout ID in state
  };

  // handle to open Add Department modal === >>>
  const openAddDepartment = () => {
    toggleModalShow(true);
    resetDepartmentForm(true);
  };

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileFilter
          permissions={permissions}
          openAddDepartment={openAddDepartment}
          handleFilterChange={handleFilterChange}
          formik={formik}
        />
      ) : isDesktop ? (
        <BrowserFilter
          permissions={permissions}
          openAddDepartment={openAddDepartment}
          handleFilterChange={handleFilterChange}
          formik={formik}
        />
      ) : (
        <BrowserFilter
          permissions={permissions}
          openAddDepartment={openAddDepartment}
          handleFilterChange={handleFilterChange}
          formik={formik}
        />
      )}
    </React.Fragment>
  );
};

export default Filter;
