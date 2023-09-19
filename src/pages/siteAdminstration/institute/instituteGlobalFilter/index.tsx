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
      if (currentInstitute === 0) {
        setSelectedValue(institutes.items[0].id);
        dispatch(globalFilterActions.currentInstitute(institutes.items[0].id))
        localStorage.setItem("institute", institutes.items[0].id);
      } else {
        setSelectedValue(currentInstitute);
        localStorage.setItem("institute", currentInstitute);
      }
    }
  }, [institutes]);

  const getCurrentValue = (e : any) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedValue(e.target.value);
    dispatch(globalFilterActions.currentInstitute(e.target.value))
    localStorage.setItem("institute", e.target.value);
  }

  return (
    <>
      <div className="row gx-2 me-2">
        <div className="col-auto">
          <label className="col-form-label">Institute: </label>
        </div>
        {institutes.items.length > 1 ?
          <div className="col-auto">
            <select 
              className="form-select"
              value={selectedValue} 
              onChange={getCurrentValue}
              aria-readonly
              >
              {institutes.items.map((el: any, index: number) => (
                <option key={index} value={el.id} data-name={el.name}>{el.name}</option>
                ))}
            </select>
          </div>
        : 
          <div>
            <span className="col-form-label">{institutes.items[0]?.name}</span>
          </div>
        }
      </div>
    </>
  );
}

export default InstituteFilter;