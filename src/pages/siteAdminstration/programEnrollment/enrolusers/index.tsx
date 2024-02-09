import View from "./view";
import { useState } from "react";

const EnrolUsersCourse = () => {
  const [modalShow, setModalShow] = useState(false);

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const enrolUserHandler = () => {
    toggleModalShow(true);
  };

  return (
    <View
      modalShow={modalShow}
      toggleModalShow={toggleModalShow}
      enrolUserHandler={enrolUserHandler}
    />
  );
};

export default EnrolUsersCourse;