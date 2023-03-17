import { useState } from "react";
import { Field } from "formik";

const FieldTypeRadio = ({
  setcurrentvalue,
  currentformvalue,
  type = "radio",
  name,
  value,
  radioText,
}: any) => {

  const [checkedBtn, setCheckedBtn] = useState((currentformvalue[name] !== undefined && currentformvalue[name] === value) ? true : false);
  
  const updateFieldCheckedStatus = (e : any) => {  
    if (name === 'programtype') {
      let programlist = currentformvalue.programtypeList;
      let idToFind = parseInt(e.target.value);
      for (let i = 0; i < programlist.length; i++) {
        if (programlist[i].id === idToFind) {
          currentformvalue.isBatchYearRequired = programlist[i].isBatchYearRequired;
          break;
        }
      }
    }
    currentformvalue[e.target.name] = e.target.value
    setcurrentvalue(currentformvalue); 
    setCheckedBtn(true);
  }
  
  return (
    <label className="mx-2">
      <Field
        type={type}
        name={name}
        value={value}
        checked={checkedBtn}
        onChange={updateFieldCheckedStatus}
        isBatchYearRequired="testing attribute"
      />{" "}
      {radioText}
    </label>
  );
};

export default FieldTypeRadio;
