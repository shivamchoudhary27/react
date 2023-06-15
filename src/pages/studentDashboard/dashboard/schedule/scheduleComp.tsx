import React from 'react'
import { Table, Button, Card } from "react-bootstrap";
import ScheduleTable from './scheduleTable';

const MyScheduleComp = () => {
  let currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  return (
    <>  
    <div className="mitblock todaysession-block">
        <h3 className="mitblock-title">
          Today's session
          <span className='tsb-date'>{currentDate}</span>
        </h3>        
        <ScheduleTable />
    </div>        
    </>
  )
}

export default MyScheduleComp;