import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';

const CalendarFilters = ({events, filters, showAllNone}) => {
  const [isChecked, setIsChecked] = useState(Object.keys(events));   // to keep the checkbox inputs check or uncheck
  const [checkBoxes, setCheckBoxes] = useState([]);
  const [showAllCheck, setShowAllCheck] = useState('checked');

  useEffect(() => {
    filters(isChecked);
  }, [isChecked]);

  const handleChecked = (e) => {
    if (e.target.name === "showall") {
      toggleShowAllNone(e.target)
      return;
    }
    setShowAllCheck('');
    if (e.target.checked === true) {
      setIsChecked((current) => [...current, e.target.name]);
    } else {
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
            // {"checked"}
          /> {" "}
          Show All/none
        </div>
        { (typeof events === "object" && events !== null) 
          &&
          Object.entries(events).map(([key, value]) => (
            <div key={key}>
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