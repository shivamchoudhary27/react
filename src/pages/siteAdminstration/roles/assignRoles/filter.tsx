import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { getData } from "../../../../adapters/coreservices";
import { useDispatch } from "react-redux";
import ACTIONSLIST from "../../../../store/actions";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import * as Yup from "yup";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const Filter = ({
  validateFilterEmail,
  currentInstitute,
  userData,
  getValidateUser,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validateInputEmail, setValidateEmail] = useState(userData);
  const [validatedUser, setValidatedUser] = useState({});
  const [initialValues, setInititalvalues] = useState({email: userData});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  useEffect(() => {
    setInititalvalues({email: userData})
  }, [userData]);

  useEffect(() => {
    if (validateInputEmail !== "") {
      getData(`/${currentInstitute}/users`, {
        pageNumber: 0,
        pageSize: 100,
        email: validateInputEmail,
      })
        .then((result: any) => {
          if (result.data !== "" && result.status === 200) {
            if (result.data.items.length === 1) {
              navigate(`/assignroles/${result.data.items[0].userId}`);
              getValidateUser(false);
            } else {
              setShowAlert(true);
              setAlertMsg({
                message: "Email not found",
                alertBoxColor: "danger",
              });
              getValidateUser(true);
              navigate(`/assignroles/`);
            }
          }
        })
        .catch((err: any) => {
          // dispatch({
          //   type: ACTIONSLIST.mitGlobalAlert,
          //   alertMsg: "Action failed due to some error",
          //   status: true,
          // });
        });
    }
  }, [validateInputEmail]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    enableReinitialize: true,
    
    onSubmit: (values) => {
      setValidateEmail(values.email);
    },
    onReset: () => {
      formik.setValues({
        email: "",
      });
    },
  });

  const handleReset = () => {
    setValidateEmail("");
    setInititalvalues({email: ""})
    setShowAlert(false);
    navigate(`/assignroles/`);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);

  return (
    <React.Fragment>
      <div className="filter-wrapper mt-2">
        <form onSubmit={formik.handleSubmit}>
          <Row className="g-2">
            <Col>
              <label htmlFor="name" hidden>
                Name
              </label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <FieldErrorMessage
                touched={formik.touched.email}
                errors={formik.errors.email}
                msgText={formik.errors.email}
              />
              {showAlert !== false && <span>Email not found</span>}
            </Col>
            <Col>
              <Button variant="primary" type="submit" className="me-2">
                Search Email
              </Button>
              <Button
                variant="outline-secondary"
                type="reset"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </form>
      </div>
      {/* <TimerAlertBox
        alertMsg={alertMsg.message}
        className="mt-3"
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      /> */}
    </React.Fragment>
  );
};

export default Filter;
