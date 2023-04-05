import React from 'react'
import Select from 'react-select';

const MultiSelect = ({
    className,
    placeholder,
    field,
    form,
    options,
    isMulti = false
}: any) => {

    console.log(options, field.value)

    const onChange = (option) => {
        form.setFieldValue(
          field.name,
          isMulti
            ? (option as Option[]).map((item: Option) => item.name)
            : (option as Option).name
        );
      };

      const getValue = () => {
        if (options) {
          return isMulti
            ? options.items.filter(option => field.value.indexOf(option.name) >= 0)
            : options.items.find(option => option.value === field.name);
        } else {
          return isMulti ? [] : ("" as any);
        }
      };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  )
}

export default MultiSelect