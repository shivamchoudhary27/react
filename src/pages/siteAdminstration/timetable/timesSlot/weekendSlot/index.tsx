import WeekendSlotModal from "./form";
import React, { useState } from "react";

type Props = {};

const WeekendSlot = (props: Props) => {
  const [weekendObj, setWeekendObj] = useState({});

  // get id, name from the department table === >>>
  const editHandlerById = () => {
    setDepartmentObj();
  };

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  return <WeekendSlotModal />;
};

export default WeekendSlot;
