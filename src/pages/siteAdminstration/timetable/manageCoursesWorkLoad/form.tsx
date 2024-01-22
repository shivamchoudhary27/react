import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Modal } from "react-bootstrap";
import { setHasChildProp } from "./local";
import React, { useState, useEffect } from "react";
import { getChildren, updateCategoryLevels } from "./utils";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import { getData, putData } from "../../../../adapters/microservices";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";

// Formik Yup validation === >>>
const formSchema = Yup.object({
  name: Yup.string().trim().required("Course name is required"),
  theoryWorkload: Yup.number()
    .integer("Number must be an integer")
    .positive("Number must be positive")
    .required("Number is required"),
  labWorkload: Yup.number()
    .integer("Number must be an integer")
    .positive("Number must be positive")
    .required("Number is required"),
});

const CourseWorkLoadModal = ({
  show,
  onHide,
  courseobj,
  programId,
  toggleCourseModal,
  refreshcategories,
  currentInstitute,
}: any) => {
  const [courseDetail, setCourseDetails] = useState({});
  const [categorieslist, setCategoriesList] = useState([]);
  const [filteredCategories, setFilterCategories] = useState([]);
  const [filterUpdate, setFilterUpdate] = useState({
    pageNumber: 0,
    // pageSize: pagination.PERPAGE,
    pageSize: 100,
  });
  const [initValues, setInitValues] = useState({
    id: courseobj.id,
    name: courseobj.name,
    theoryWorkload: courseobj.theoryWorkload,
    labWorkload: courseobj.labWorkload,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // Get category Data from API === >>
  useEffect(() => {
    if (courseobj.id > 0) {
      setInitValues({
        id: courseobj.id,
        name: courseobj.name,
        theoryWorkload: courseobj.theoryWorkload,
        labWorkload: courseobj.labWorkload,
      });
    }
  }, [courseobj]);

  // Get category Data from API === >>
  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = () => {
    const endPoint = `/${programId}/category`;
    getData(endPoint, filterUpdate)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCategoriesList(res.data.items);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (categorieslist.length > 0) {
      const convertedResult = categorieslist
        .filter((item) => item.parent === 0)
        .sort((a, b) => a.weight - b.weight)
        .reduce(
          (acc, item) => [...acc, item, ...getChildren(item, categorieslist)],
          []
        );

      convertedResult.forEach((item: any) => {
        if (item.parent === 0) {
          item.level = 1;
          updateCategoryLevels(convertedResult, item.id, 2);
        }
      });
      const hasChildPropAdded = setHasChildProp(convertedResult);
      const filteredArr = hasChildPropAdded.filter(
        (obj: any) => obj.haschild === false
      );
      setFilterCategories(filteredArr);
    }
  }, [categorieslist]);

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);

    if (courseobj.id > 0) {
      const endPoint = `${currentInstitute}/timetable/courseworkload/${courseobj.id}`;
      setSubmitting(true);
      putData(endPoint, values)
        .then((res: any) => {
          if (res.status === 200) {
          }
          toggleCourseModal(false);
          setSubmitting(true);
          refreshcategories();
          Swal.fire({
            timer: 3000,
            width: "25em",
            color: "#666",
            icon: "success",
            background: "#e7eef5",
            showConfirmButton: false,
            text: "	Course Work Load has been successfully  Update "
          });
        })
        .catch((err: any) => {
          setSubmitting(true);
          toggleCourseModal(false);
          setShowAlert(true);
          setAlertMsg({
            message: "Failed to add course! Please try again.",
            alertBoxColor: "danger",
          });
        });
    }
    // resetForm();	Courses
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
            Update Course Work Load
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize={true}
            initialValues={initValues}
            validationSchema={formSchema}
            onSubmit={(values, action) => {
              handleFormData(values, action);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="name"
                    labelText="Course Name"
                    required="required"
                  />
                  <FieldTypeText name="name" placeholder="Name" disabled />
                  <FieldErrorMessage
                    errors={errors.name}
                    touched={touched.name}
                    msgText="Required"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="theoryWorkload"
                    labelText="Theory Work Load (in Hour)"
                    number
                    required="required"
                  />
                  <FieldTypeText
                    type="number"
                    name="theoryWorkload"
                    placeholder="Theory work load"
                  />
                  <FieldErrorMessage
                    errors={errors.theoryWorkload}
                    touched={touched.theoryWorkload}
                    msgText="Required"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="labWorkload"
                    labelText="Lab Work Load (in Hour)"
                    number
                    required="required"
                  />
                  <FieldTypeText
                    type="number"
                    name="labWorkload"
                    placeholder="Lab work load"
                  />
                  <FieldErrorMessage
                    errors={errors.labWorkload}
                    touched={touched.labWorkload}
                    msgText="Required"
                  />
                </div>

                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      // isSubmitting={isSubmitting}
                      btnText={courseobj.id === 0 ? "Submit" : "Update"}
                    />{" "}
                    {courseobj.id === 0 && (
                      <CustomButton
                        type="reset"
                        btnText="Reset"
                        variant="outline-secondary"
                      />
                    )}
                  </div>
                ) : (
                  <LoadingButton
                    variant="primary"
                    btnText={
                      courseobj.id === 0 ? "Submitting..." : "Updating..."
                    }
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
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default CourseWorkLoadModal;
