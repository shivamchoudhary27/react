import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import ColorBox from "../../widgets/colorBox";

const CalendarFilters = ({events, filters, showAllNone}) => {
  const eventModules = Object.keys(events);
  const totalModules = eventModules.length;
  const [isChecked, setIsChecked] = useState(eventModules);   // to keep the checkbox inputs check or uncheck
  const [showAllCheck, setShowAllCheck] = useState('checked');

  useEffect(() => {
    if (showAllCheck === '') filters(isChecked);
    if (isChecked.length === (totalModules)) setShowAllCheck('checked');
  }, [isChecked]);

  const handleChecked = (e) => {
    if (e.target.name === "showall") {
      toggleShowAllNone(e.target)
      return;
    }
    if (e.target.checked === true) {
      setIsChecked((current) => [...current, e.target.name]);
    } else {
      setShowAllCheck('');
      setIsChecked((current) =>
        current.filter((element) => {
          return element !== e.target.name;
        })
      );
    }
  }

  const setAllShow = () => {
    const allChecked = Object.keys(events);
    setIsChecked(allChecked);
    showAllNone(true);
  }

  const setNoneShow = () => {
    setIsChecked([]);
    showAllNone(false);
  }

  const toggleShowAllNone = (e) => {
    if (e.checked === true) {
      setShowAllCheck('checked');
      setAllShow();
    } else {
      setShowAllCheck('');
      setNoneShow();      
    }
  }

  const eventCheckboxes = () => {
    return (
      <>
        <label className="event-keys-item showall">
          Show All/None
          <input type="checkbox" name="showall" value="showall"
            onChange={(e) => {handleChecked(e)}}
            checked={showAllCheck}
          /> {" "}
          <span className="checkmark"></span>
        </label>
        { (typeof events === "object" && events !== null) 
          &&
          Object.entries(events).map(([key, value]) => (            
            <label className="event-keys-item" key={key}>
              {" " + key.charAt(0).toUpperCase() + key.slice(1)}
              <input type="checkbox" name={key} value={value} 
                checked={isChecked.includes(key) && 'checked'}
                onChange={(e) => {handleChecked(e)}}
              />
              <span className="checkmark" style={{ borderColor: `${value}` }}></span>
            </label>
          ))
        }
      </>
    );
  }

  return (
    <div className="mitblock events-keys">
        <h3 className="mitblock-title">Key</h3>
        <div className="mitblock-body">{eventCheckboxes()}</div>
    </div>
  );
}

export default CalendarFilters;