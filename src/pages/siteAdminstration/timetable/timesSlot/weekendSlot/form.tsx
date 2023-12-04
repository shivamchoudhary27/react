import * as Yup from "yup";
import { Formik, Form } from "formik";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CustomButton from "../../../../../widgets/formInputFields/buttons";
import FieldTypeCheckbox from "../../../../../widgets/formInputFields/formCheckboxField";
import {
  getData,
  postData,
  putData,
} from "../../../../../adapters/microservices";

// Formik Yup validation === >>>
const Schema = Yup.object({});

const WeekendSlotModal = ({
  modalShow,
  onHide,
  weekendSlotObj,
  toggleModalShow,
}: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const currentInstitute: number = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );
  // Initial values of react table === >>>
  const initialValues = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  };
  const [initFormValues, setInitFormValues] = useState(initialValues);
  const [weekendData, setWeekendData] = useState([]);

  useEffect(() => {
    if (weekendSlotObj.id === 0) {
      getData(`/weekdays/${currentInstitute}`, {})
        .then((res: any) => {
          if (res.data !== "") {
            setWeekendData(res.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else if (weekendSlotObj.id !== 0) {
      getData(`/weekdays/${currentInstitute}`, {
        departmentId: weekendSlotObj.id,
      })
        .then((res: any) => {
          if (res.data !== "") {
            setWeekendData(res.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [weekendSlotObj]);

  useEffect(() => {
    if (weekendSlotObj.id === 0 || weekendSlotObj.id !== 0) {
      let filteredData = [];
      if (weekendSlotObj.id === 0) {
        filteredData = weekendData.filter(
          (item: any) => item.departmentId === null
        );
      } else {
        filteredData = weekendData.filter(
          (item: any) => item.departmentId === weekendSlotObj.id
        );
      }

      const updatedValues = { ...initFormValues };
      filteredData.forEach((item: any) => {
        const lowercaseDays = item.weekDays.map((day: any) =>
          day.toLowerCase()
        );
        Object.keys(updatedValues).forEach((elem: any) => {
          updatedValues[elem] = false;
        });
        lowercaseDays.forEach((el: any) => {
          updatedValues[el] = true;
        });
      });
      setInitFormValues(updatedValues);
    }
  }, [weekendData, weekendSlotObj]);

  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    const trueWeekDays = Object.keys(values).filter((day) => values[day]);
    const formattedWeekDays = { weekDays: trueWeekDays };
    if (weekendSlotObj.id === 0) {
      setSubmitting(true);
      postData(`/weekdays/${currentInstitute}`, formattedWeekDays)
        .then((res: any) => {
          if (res.data !== "") {
            toggleModalShow(false);
          }
          setSubmitting(false);
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(false);
        });
    } else {
      setSubmitting(true);
      putData(
        `/weekdays/${currentInstitute}/${weekendSlotObj.id}`,
        formattedWeekDays
      )
        .then((res: any) => {
          if (res.data !== "") {
            toggleModalShow(false);
          }
          setSubmitting(false);
        })
        .catch((err: any) => {
          console.log(err);
          setSubmitting(false);
        });
    }
  };
  // console.log(initFormValues);

  return (
    <Modal
      onHide={onHide}
      show={modalShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {weekendSlotObj.id === 0
            ? `Set Institute Weekend`
            : `Set Department Weekend`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={initFormValues}
          validationSchema={Schema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
          }}
        >
          {({ errors, touched, isSubmitting, setValues, values }) => (
            <Form>
              <div className="mb-3">
                <div>
                  <FieldTypeCheckbox name="monday" checkboxLabel="Monday" />
                </div>
                <div>
                  <FieldTypeCheckbox name="tuesday" checkboxLabel="Tuesday" />
                </div>
                <div>
                  <FieldTypeCheckbox
                    name="wednesday"
                    checkboxLabel="Wednesday"
                  />
                </div>
                <div>
                  <FieldTypeCheckbox name="thursday" checkboxLabel="Thursday" />
                </div>
                <div>
                  <FieldTypeCheckbox name="friday" checkboxLabel="Friday" />
                </div>
                <div>
                  <FieldTypeCheckbox name="saturday" checkboxLabel="Saturday" />
                </div>
                <div>
                  <FieldTypeCheckbox name="sunday" checkboxLabel="Sunday" />
                </div>
              </div>
              <div className="modal-buttons">
                <CustomButton
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmitting}
                  btnText="Submit"
                />{" "}
                {/* <CustomButton
                  type="reset"
                  btnText="Reset"
                  variant="outline-secondary"
                /> */}
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default WeekendSlotModal;
