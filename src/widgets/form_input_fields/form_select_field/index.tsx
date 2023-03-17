import { Field } from "formik";

const FieldTypeSelect = ({
    name,
    options,
    as="select",
    className="form-control",
}: any) => {
  return (
    <>
      <Field as={as} name={name} className={className}>
        <option value="0">Select {name}</option>
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
