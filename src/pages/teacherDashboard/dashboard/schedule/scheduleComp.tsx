import React from 'react'
import ScheduleTable from './scheduleTable';

const MyScheduleComp = () => {
  return (
    <>
      <div className="mitblock todaysession-block">
        <h3 className="mitblock-title">
          Today's session
          <span className='tsb-date'>17 February, 2023</span>
        </h3>        
        <ScheduleTable />
      </div>
    </>
  )
}

export default MyScheduleComp;