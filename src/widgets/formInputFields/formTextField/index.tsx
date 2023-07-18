import { Field } from "formik";
import cx from "classnames";
const FieldTypeText = ({
  id,
  name,
  placeholder,
  type = "text",
  className,
  disabled,
  // onBlur = () => {}
}: any) => {
  return (
    <>
      <Field
        id={id}
        name={name}
        type={type}
        className={cx("form-control", className)}
        placeholder={placeholder}
        disabled={disabled}
        // onBlur={onBlur}
      />
    </>
  );
};

export default FieldTypeText;
