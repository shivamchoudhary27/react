import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { globalFilterActions } from "../../../../store/slices/globalFilters";
import { getData } from "../../../../adapters/microservices";
import switchinstitute from "../../../../assets/images/icons/switch-institue-icon.svg";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

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
      <div className="select-institute">
        <OverlayTrigger
          rootClose
          trigger={['click']}
          placement="bottom"
          overlay={
            <Popover id="popover-basic">
              <Popover.Header as="h3">
                {institutes.items.length > 1
                ?
                "Switch Institute"
                :
                "Institute"
                }
              </Popover.Header>
              <Popover.Body>
                {institutes.items.length > 1 ? 
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
                  :
                  <b className="ms-2">{institutes.items[0]?.name}</b>
                }
              </Popover.Body>
            </Popover>
          }
        >
          <span className="head-icon">
            <img src={switchinstitute} alt="Select Institute" />
          </span>
        </OverlayTrigger>
      </div>
    </>
  ); 
}

export default InstituteFilter;