import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { globalFilterActions } from "../../../../store/slices/globalFilters";
import { getData } from "../../../../adapters/microservices";

const InstituteFilter = () => {
  const dispatch = useDispatch();
  const currentInstitute = useSelector(state => state.globalFilters.currentInstitute);
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
      // const setValue = (currentInstitute === 0) ? 0 : institutes.items[0].id;
      // updateCurrentInstitute(setValue);
      if (currentInstitute === 0) {
        setSelectedValue(institutes.items[0].id);
        dispatch(globalFilterActions.currentInstitute(institutes.items[0].id))
        localStorage.setItem("institute", institutes.items[0].id);
      } else {
        setSelectedValue(currentInstitute);
        localStorage.setItem("institute", currentInstitute);
      }
      // updateInstituteName(institutes.items[0].name);
    }
  }, [institutes]);

  const getCurrentValue = (e : any) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedValue(e.target.value);
    dispatch(globalFilterActions.currentInstitute(e.target.value))
    // updateCurrentInstitute(e.target.value);
    // updateInstituteName(selectedOption.innerText);
    localStorage.setItem("institute", e.target.value);
  }

  return (
    <>
      {
        institutes.items.length > 1
        &&
        <div className="row gx-2 me-2">
          <div className="col-auto">
            <label className="col-form-label">Institute: </label>
          </div>
          <div className="col-auto">
            <select 
              className="form-select"
              value={selectedValue} 
              onChange={getCurrentValue}>
              {institutes.items.map((el: any, index: number) => (
                <option key={index} value={el.id} data-name={el.name}>{el.name}</option>
              ))}
            </select>
          </div>
        </div>
      }
    </>
  );
}

export default InstituteFilter;