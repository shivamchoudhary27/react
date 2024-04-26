import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import FieldLabel from "../../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import { postData } from "../../../../../adapters/microservices";
import { postData as updateUserInfo} from "../../../../../adapters/coreservices";
import TimerAlertBox from "../../../../../widgets/alert/timerAlert";
import { LoadingButton } from "../../../../../widgets/formInputFields/buttons";
import { globalUserInfoActions } from "../../../../../store/slices/userInfo";
import { addRemoveFileProperty } from "../../../../../globals/storefile";
import '../style.scss'

const EditPicture = ({
  userobj,
  togglemodalshow,
  updateAddRefresh,
}: any) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [userInfo, setUserInfo] = useState(userobj);
  const [removeStatus, setRemoveStatus] = useState(false);

  useEffect(() => {
    setUserInfo(userobj);
  }, [userobj]);

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    postData(`/files/user/${userobj.userId}`, {}, values.file)
    .then((res: any) => {
        if (res.status === 200) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
            resetForm();
        }
    })
    .catch((err: any) => {
        console.log(err);
        if (err.response.status === 404) {
            setSubmitting(false);
            setShowAlert(true);
            setAlertMsg({
                message: `${err.response.data.message}`,
                alertBoxColor: "danger",
            });
        }else{
          setAlertMsg({
          message: err.response.data.message,
          alertBoxColor: "danger",
        });}
    });
  };

  const removeCurrentPicture = () => {
    setRemoveStatus(true);
    const values = {
      userId: userInfo.userId,
      mobile: userInfo.mobile,
      enabled: userInfo.enabled,
      userEmail: userInfo.userEmail,
      bloodGroup: userInfo.bloodGroup,
      fatherName: userInfo.fatherName,
      genderType: userInfo.genderType,
      motherName: userInfo.motherName,
      parentEmail: userInfo.parentEmail,
      dateOfBirth: userInfo.dateOfBirth,
      userCountry: userInfo.userCountry,
      userLastName: userInfo.userLastName,
      parentsMobile: userInfo.parentsMobile,
      userFirstName: userInfo.userFirstName,
      roles: userInfo.roles.map((role: any) => {
        return {
          ...role,
        };
      }),
      files: addRemoveFileProperty(userInfo.files)
    }
    
    updateUserInfo(`/user/profile`, values)
    .then((res: any) => {
        if (res.status === 200) {
          togglemodalshow(false);
          updateAddRefresh(); 
          dispatch(globalUserInfoActions.removeUserPicture());
        }
        setRemoveStatus(false);
    })
    .catch((err: any) => {
        console.log(err);
        if (err.response.status === 404) {
            setShowAlert(true);
            setAlertMsg({
                message: `${err.response.data.message}`,
                alertBoxColor: "danger",
            });
        }
        setRemoveStatus(false);
    });
  }

  return (
    <React.Fragment>
      { userobj.files !== undefined && userobj.files.length > 0 &&
        <React.Fragment>
          <div className="user-picture-form">
              <img
                src={userobj.files[0].url}
                alt={userobj.files[0].originalFileName}
                width="150px"
              />
          </div>
          {removeStatus === false ? (
            <div className="modal-buttons">
            <CustomButton
              type="reset"
              btnText="Remove Current Picture"
              variant="outline-secondary"
              onClick={() => removeCurrentPicture()}
            />
            </div>
          ) : (
            <LoadingButton
              variant="primary"
              btnText={"Removing Picture..."}
              className="modal-buttons"
            />
          )}
        </React.Fragment>
      }
      <Formik
        enableReinitialize={true}
        initialValues={{}}
        onSubmit={(values, action) => {
          handleFormData(values, action);
        }}
      >
        {({ errors, touched, isSubmitting, setValues, values, setFieldValue }) => (
          <Form>
            <div className="mb-3">
                <FieldLabel
                    htmlfor="file"
                    labelText="Upload Image"
                />
                <input
                    className="form-control"
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files[0]);
                    }}
                />
            </div>

            {isSubmitting === false ? (
              <div className="modal-buttons">
                <CustomButton
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  btnText="Update Picture"
                />
              </div>
            ) : (
              <LoadingButton
                variant="primary"
                btnText={"Updating..."}
                className="modal-buttons"
              />
            )}
          </Form>
        )}
      </Formik>
      <TimerAlertBox
        alertMsg={alertMsg.message}
        className="mt-3"
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
    </React.Fragment>
  );
};

export default EditPicture;
