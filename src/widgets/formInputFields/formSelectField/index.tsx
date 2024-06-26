import { Field } from "formik";

const FieldTypeSelect = ({
    name,
    options,
    setcurrentvalue,
    currentformvalue,
    as="select",
    className="form-select",
    emptyOption=false,
    selectDefaultLabel="",
    timeUnit="",
    disabled = ""
}: any) => {

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
  }

  return (
    <>
      <Field as={as} name={name} className={className} onChange={updateFieldCheckedStatus} disabled={disabled === "isDisabled"}>
        {emptyOption === false && 
          <option value="0">
            {
              timeUnit !== "" ? timeUnit : 
              `Select 
              ${selectDefaultLabel !== "" ? selectDefaultLabel : name.charAt(0).toUpperCase() + name.slice(1)}`
            }
          </option>
        }
        {
          options.map((el: any, index: number)=>(
              <option value={el.id} key={index}>
                  {el.name}
              </option>
          ))
        }
      </Field>
    </>
  );
};

export default FieldTypeSelect;
