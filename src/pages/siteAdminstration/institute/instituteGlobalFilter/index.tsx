import {useState, useEffect} from "react";
import { makeGetDataRequest } from "../../../../features/api_calls/getdata";

const InstituteFilter = ({updateCurrentInstitute}: any) => {
  const dummyData = {items: [], pager: {totalElements: 0, totalPages: 0}};
  const [institutes, setInstitutes] = useState(dummyData);
  const filters = {pageNumber: 0, pageSize : 50};
  const [selectedValue, setSelectedValue] = useState('');

  // department API call === >>>
  useEffect(() => {
    makeGetDataRequest('/institutes', filters, setInstitutes);
  }, []);

  useEffect(() => {
    if (institutes.items.length > 0) {
      setSelectedValue(institutes.items[0].id);
      updateCurrentInstitute(institutes.items[0].id);
    }
  }, [institutes]);

  const getCurrentValue = (e : any) => {
    setSelectedValue(e.target.value);
    updateCurrentInstitute(e.target.value);
  }

  return (
    <select 
      className="form-control"
      value={selectedValue} 
      onChange={getCurrentValue}>
      <option value={0}>Select Institute</option>
      {institutes.items.map((el: any, index: number) => (
          <option key={index} value={el.id}>{el.name}</option>
      ))}
    </select>
  );
}

export default InstituteFilter;