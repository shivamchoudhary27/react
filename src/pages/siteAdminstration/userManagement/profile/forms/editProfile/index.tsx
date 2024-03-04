
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "../../../../../../adapters/coreservices";
import { pagination } from "../../../../../../utils/pagination";
import { useParams } from "react-router-dom";
import View from "./view";

const EditUserProfile = () => {
  const { userid } = useParams();

  const initialFormValues = {
    mobile: "",
    userEmail: "",
    genderType: "",
    bloodGroup: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    parentEmail: "",
    userCountry: "",
    userLastName: "",
    parentsMobile: "",
    userFirstName: "",
  };

  const currentInstitute = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  const [filterUpdate, setFilterUpdate] = useState({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    userId: userid,
  });

  const [initialValues, setInitialvalues] = useState(initialFormValues);

  useEffect(() => {
    if (currentInstitute > 0) {
      getData(`/user/profile/${userid}`, {})
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            setInitialvalues(result.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [currentInstitute]);
  return (
    <React.Fragment>
      <View
        userid={userid}
        initialValues={initialValues}
        currentInstitute={currentInstitute}
      />
    </React.Fragment>
  );
};

export default EditUserProfile;
