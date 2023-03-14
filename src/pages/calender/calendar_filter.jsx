import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';

const CalendarFilters = ({events, filters}) => {
  const [isChecked, setIsChecked] = useState([]);
  const [checkBoxes, setCheckBoxes] = useState([]);

  useEffect(() => {
    filters(isChecked);
  }, [isChecked]);

  const handleChecked = (e) => {
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

  const eventCheckboxes = () => {
    return (
      <>
        { (typeof events === "object" && events !== null) 
          &&
          Object.entries(events).map(([key, value]) => (
            <div key={key}>
              <input type="checkbox" name={key} value={value} 
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