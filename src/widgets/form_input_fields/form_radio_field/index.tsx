import {useState} from "react";
import { Field } from "formik";

const FieldTypeRadio = ({
  setcurrentvalue,
  currentfieldvalue,
  type = "radio",
  name,
  value,
  radioText,
}: any) => {

  const [checkedBtn, setCheckedBtn] = useState(false);

  const test = (e : any) => {
    currentfieldvalue[name] = e.target.value
    setcurrentvalue(currentfieldvalue);
    setCheckedBtn(true);
  }
  
  return (
    <label className="mx-2">
      <Field
        type={type}
        name={name}
        value={value}
        checked={checkedBtn}
        onChange={test}
      />{" "}
      {radioText}
    </label>
  );
};

export default FieldTypeRadio;
