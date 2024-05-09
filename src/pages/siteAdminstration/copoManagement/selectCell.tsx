import React from "react";
import { Formik, Form, Field } from "formik";

type Props = {
    name: string
    options: any
};

const initialValues = {
  selectedOption: null,
};

const customOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  // Add more options as needed
];

const SelectCell = ({ name, options = customOptions }: Props) => {
  const handleSubmit = (values: any) => {
    // Handle form submission here
    console.log("Selected option:", values.selectedOption);
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        // validationSchema={departmentSchema}
        onSubmit={(values, action) => {
        //   handleFormData(values, action);
        console.log(values)
        }}
      >
        {() => (
          <Form>
            <Field
              as="select"
              name={name}
              className="form-select"
              //   onChange={updateFieldCheckedStatus}
            >
              <option value="0">Select </option>
              {options.map((el: any, index: number) => (
                <option value={el.id} key={index}>
                  {el.label}
                </option>
              ))}
            </Field>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default SelectCell;
