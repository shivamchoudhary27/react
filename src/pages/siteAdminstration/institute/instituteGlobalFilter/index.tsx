import { useState, useEffect } from "react";
import { getData } from "../../../../adapters/microservices";

const InstituteFilter = ({updateCurrentInstitute, updateInstituteName}: any) => {
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}};
  const [institutes, setInstitutes] = useState(dummyData);
  const filters = {pageNumber: 0, pageSize : 50};
  const [selectedValue, setSelectedValue] = useState('');

  // department API call === >>>
  useEffect(() => {
    getData('/institutes', filters)
    .then((result : any) => {
        if (result.status === 200 && result.data !== "" ) {
          const filteredArray = result.data.items.filter((obj :any) => obj.locked !== false);
          result.data.items = filteredArray
          setInstitutes(result.data);
        }
    })
    .catch((err : any) => {
        console.log(err);
    });
  }, []);

  useEffect(() => {
    if (institutes.items.length > 0) {
      setSelectedValue(institutes.items[0].id);
      updateCurrentInstitute(institutes.items[0].id);
      updateInstituteName(institutes.items[0].name);
    }
  }, [institutes]);

  const getCurrentValue = (e : any) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedValue(e.target.value);
    updateCurrentInstitute(e.target.value);
    updateInstituteName(selectedOption.innerText);
  }

  return (
    <select 
      className="form-control"
      value={selectedValue} 
      onChange={getCurrentValue}>
      {institutes.items.map((el: any, index: number) => (
        <option key={index} value={el.id} data-name={el.name}>{el.name}</option>
      ))}
    </select>
  );
}

export default InstituteFilter;