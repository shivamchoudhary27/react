import { Field } from "formik";

const FieldTypeText = ({
  id,
  name,
  placeholder,
  type = "text",
  className = "form-control",
  disabled
}: any) => {
  return (
    <>
      <Field
        id={id}
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
      />
    </>
  );
};

export default FieldTypeText;
