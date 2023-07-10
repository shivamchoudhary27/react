import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import * as Yup from "yup";
import { postData, putData } from "../../../../adapters/coreservices";
import { pagination } from "../../../../utils/pagination";
import { getData } from "../../../../adapters/microservices";
import { useDispatch } from "react-redux";
import ACTIONSLIST from "../../../../store/actions";
import { IAlertMsg } from "./interfaces";

const initialValues = {
  email: "",
};

// Formik Yup validation === >>>
const userFormSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

interface IInstituteList {
  createdTime: string;
  id: number;
  instanceUrl: string;
  lastModifiedTime: string;
  locked: boolean;
  name: string;
  shortCode: string;
  userEmail: string;
  userId: number;
  webServiceToken: string;
}

const AssignInstituteModal = ({
  show,
  onHide,
  userobj,
  togglemodalshow,
  updateAddRefresh,
  currentInstitute,
}: any) => {
  const dispatch = useDispatch();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [instituteList, setInstituteList] = useState<IInstituteList[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<IAlertMsg>({
    message: "",
    alertBoxColor: "",
  });
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  const handleCheckboxChange = (checkboxId) => {
    if (selectedCheckboxes.includes(checkboxId)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((id) => id !== checkboxId)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxId]);
    }
  };

  // get institute list === >>>
  useEffect(() => {
    getData("/institutes", filterUpdate)
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          if (result.data.items.length < 1) {
          }
          setInstituteList(result.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);
    if (userobj.id === 0) {
      postData(`/${currentInstitute}/users`, values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 201)) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          if (err.response.status === 404) {
            setSubmitting(false);
            setShowAlert(true);
            setAlertMsg({
              message: `${err.response.data.message}. Please Sign up with a new email`,
              alertBoxColor: "danger",
            });
          }
        });
    } else {
      setSubmitting(true);
      putData(`/${currentInstitute}/users/${userobj.id}`, values)
        .then((res: any) => {
          if ((res.data !== "", res.status === 200)) {
            togglemodalshow(false);
            updateAddRefresh();
            setSubmitting(false);
          }
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(true);
        });
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Assign Institute Admin Role
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={userFormSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="Email"
                    labelText="Email"
                    required="required"
                    star="*"
                  />
                  <FieldTypeText name="email" placeholder="Email" />
                  <FieldErrorMessage
                    errors={errors.email}
                    touched={touched.email}
                    msgText="Email is required"
                  />
                  <CustomButton type="button" btnText="Search" />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="Institite"
                    labelText="Select Institute"
                    required="required"
                    star="*"
                  />
                  <div style={{ overflow: "auto", height: "150px" }}>
                    {instituteList.items.map((option: any) => (
                      <div key={option.id}>
                        <label>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedCheckboxes.includes(option.id)}
                            onChange={() => handleCheckboxChange(option.id)}
                          />{" "}
                          {option.name}
                        </label>
                      </div>
                    ))}{" "}
                  </div>
                  <FieldErrorMessage
                    errors=""
                    touched=""
                    msgText="Please Check required field"
                  />
                </div>

                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    btnText="Submit"
                  />{" "}
                  <CustomButton
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                    // onClick={() => setShowAlert(false)}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AssignInstituteModal;

const options = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Option 3" },
  { id: 4, label: "Option 4" },
  { id: 5, label: "Option 5" },
  { id: 6, label: "Option 6" },
  { id: 7, label: "Option 7" },
];
