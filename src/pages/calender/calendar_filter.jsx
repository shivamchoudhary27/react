import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import './style.scss';

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
        <div>
          <input type="checkbox" name="showall" value="showall"
            onChange={
              (e) => {
                handleChecked(e);
            }}
            checked={showAllCheck}
          /> {" "}
          Show All/none
        </div>
        { (typeof events === "object" && events !== null) 
          &&
          Object.entries(events).map(([key, value]) => (
            <div key={key}>
              <div className="color-box" style={{ backgroundColor: `${value}` }}></div>
              <input type="checkbox" name={key} value={value} 
                checked={isChecked.includes(key) && 'checked'}
                onChange={
                  (e) => {
                    handleChecked(e);
                  }}
              />
              {" " + key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
          ))
        }
      </>
    );
  }

  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Calendar Events</Accordion.Header>
        <Accordion.Body>
          {eventCheckboxes()}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default CalendarFilters;