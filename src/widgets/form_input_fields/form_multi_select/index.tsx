import { useField } from "formik";
import Select from "react-select";

const MultiSelectDropdown = ({ options, name }: any) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOptions: any) => {
    helpers.setValue(
      selectedOptions ? selectedOptions.map((option: any) => option.value) : []
    );
  };

  return (
    <Select {...field} isMulti options={options} onChange={handleChange} />
  );
};

export default MultiSelectDropdown;
