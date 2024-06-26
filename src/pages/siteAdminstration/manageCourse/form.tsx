import * as Yup from "yup";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import { Modal } from "react-bootstrap";
import { setHasChildProp } from "./local";
import "sweetalert2/src/sweetalert2.scss";
import React, { useState, useEffect } from "react";
import { getChildren, updateCategoryLevels } from "./utils";
import TimerAlertBox from "../../../widgets/alert/timerAlert";
import FieldLabel from "../../../widgets/formInputFields/labels";
import CustomButton from "../../../widgets/formInputFields/buttons";
import WaveBottom from "../../../assets/images/background/bg-modal.svg";
import {format} from "date-fns";
import { LoadingButton } from "../../../widgets/formInputFields/buttons";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import { getData, postData, putData } from "../../../adapters/microservices";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../widgets/formInputFields/formSelectField";
import { uploadFile, addRemoveFileProperty } from "../../../globals/storefile";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";

// Formik Yup validation === >>>
const formSchema = Yup.object().shape({
  name: Yup.string().trim().required("Course name is required"),
  courseCode: Yup.string().trim().required("Course code is required"),
  category: Yup.string().required("Select category"),
  startDate: Yup.string().nullable().required("Please choose a start date"),
  endDate: Yup.string()
    .nullable()
    .required("Please choose an end date")
    .when(["startDate"], (startDate, schema) => {
      return schema.test({
        name: "endDate",
        exclusive: true,
        message: "End date must be greater than the start date",
        test: (endDate: any) => {
          const selectedEndDate = new Date(endDate);
          const selectedStartDate = new Date(startDate);
          return selectedEndDate >= selectedStartDate;
        },
      });
    }),


  enrollmentCapacity: Yup.number().when("type", {
    is: "minor",
    then: Yup.number()
      .required("Enrollment capacity is required")
      .integer("Must be an integer")
      .positive("Must be a positive integer")
      .min(0, "Must be greater than or equal to 0"),
  }),
  type: Yup.string().nullable().required("Type is required"),
});

const CourseModal = ({
  show,
  onHide,
  courseobj,
  programId,
  toggleCourseModal,
  refreshcategories,
}: any) => {
  const currentDate = new Date();
  const [courseDetail, setCourseDetails] = useState({});
  const [categorieslist, setCategoriesList] = useState([]);
  const [filteredCategories, setFilterCategories] = useState([]);
  const [filterUpdate, setFilterUpdate] = useState({
    pageNumber: 0,
    // pageSize: pagination.PERPAGE,
    pageSize: 100,
  });
  

  const [initValues, setInitValues] = useState({
    id: "",
    name: "",
    courseCode: "",
    category: "",
    description: "",
    published: false,
    files: [],
    deleteImage: false,
    file: null,
    startDate: "",
    endDate: "",
    type: "",
    enrollmentCapacity: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });

  // Get category Data from API === >>
  useEffect(() => {
    setInitValues({
      id: courseobj.id,
      name: courseobj.name,
      courseCode: courseobj.courseCode,
      description: courseobj.description,
      published: courseobj.published,
      category: courseobj.category,
      files: courseobj.files,
      deleteImage: false,
      file: null,
      enrollmentCapacity: courseobj.enrollmentCapacity
        ? courseobj.enrollmentCapacity
        : "",
      type: courseobj.type ? courseobj.type.toLowerCase() : null,
      startDate:
       (courseobj.startDate !== null
          ? initialDateFormatHandler(courseobj.startDate)
          : getCurrentMonth(currentDate)),

        endDate:
          (courseobj.endDate !== null
          ? initialDateFormatHandler(courseobj.endDate)
          : getCurrentMonth(currentDate)),
        });
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

  const getCurrentMonth = (currentDate: Date) => {
    return format(currentDate, "yyyy-MM-dd'T'HH:mm");
  };

  const initialDateFormatHandler = (inputDate: string) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;

    // return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };


  // handle Form CRUD operations === >>>
  const handleFormData = (values: any, { setSubmitting, resetForm }: any) => {
    if (values.deleteImage === true) {
      values.deleted = true;
      delete values.deleteImage;
      values.files = addRemoveFileProperty(values.files);
    }

    let courseImage = values.file;
    delete courseImage?.file;

    setSubmitting(true);
    let requestData = { ...values, category: { id: values.category } };
    if (courseobj.id === 0) {
      const endPoint = `${programId}/course`;
      postData(endPoint, requestData)
        .then((res: any) => {
          if (res.status === 201) {
            uploadFile("course", res.data.id, courseImage);
            setTimeout(() => {
              toggleCourseModal(false);
              setSubmitting(false);
              refreshcategories();
              Swal.fire({
                timer: 3000,
                width: "25em",
                color: "#666",
                icon: "success",
                background: "#e7eef5",
                showConfirmButton: false,
                text: "Courses has been successfully added",
              });
            }, 3000);
          }
        })
        .catch((err: any) => {
          console.log(err);
          setShowAlert(true);
          setSubmitting(false);

          setAlertMsg({
            message: `${err.response.data.message}`,
            alertBoxColor: "danger",
          });
        });
    } else {
      const endPoint = `${programId}/course/${courseobj.id}`;
      setSubmitting(true);
      putData(endPoint, requestData)
        .then((res: any) => {
          toggleCourseModal(false);
          setSubmitting(false);
          refreshcategories();
          Swal.fire({
            timer: 3000,
            width: "25em",
            color: "#666",
            icon: "success",
            background: "#e7eef5",
            showConfirmButton: false,
            text: "Courses has been successfully updated",
          });
        })
        .catch((err: any) => {
          // toggleCourseModal(false);
          setShowAlert(true);
          setSubmitting(false);
          setAlertMsg({
            message: err.response.data.message,
            alertBoxColor: "danger",
          });
        });

      uploadFile("course", values.id, courseImage);
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-design-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {courseobj.id === 0 ? "Add Course" : "Update Course"}
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
            {({
              errors,
              touched,
              isSubmitting,
              setValues,
              values,
              handleChange,
              setFieldValue,
            }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="name"
                    labelText="Name *"
                    required="required"
                  />
                  <FieldTypeText name="name" placeholder="Name" />
                  <FieldErrorMessage
                    errors={errors.name}
                    touched={touched.name}
                    msgText="Required"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="courseCode"
                    labelText="Course Code *"
                    number
                    required="required"
                  />
                  <FieldTypeText name="courseCode" placeholder="Course Code" />
                  <FieldErrorMessage
                    errors={errors.courseCode}
                    touched={touched.courseCode}
                    msgText="Required"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="category"
                    labelText="Category"
                    required="required"
                  />
                  <FieldTypeSelect
                    name="category"
                    options={filteredCategories}
                    setcurrentvalue={setValues}
                    currentformvalue={values}
                    disabled={courseobj.id === 0 && "isDisabled"}
                  />
                  <FieldErrorMessage
                    errors={errors.category}
                    touched={touched.category}
                    msgText="Please Select Category"
                  />
                </div>

                {/* --------------------------------  */}
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="startDate"
                    labelText="Start Date"
                    required="required"
                  />
                  <FieldTypeText
                    type="datetime-local"
                    name="startDate"
                    min={new Date()}
                    placeholder="Start Date"
                  />
                  <FieldErrorMessage
                    errors={errors.startDate}
                    touched={touched.startDate}
                    msgText="Required"
                  />
                </div>

                <div className="mb-3">
                  <FieldLabel
                    htmlfor="endDate"
                    labelText="End Date"
                    required="required"
                  />
                  <FieldTypeText
                    type="datetime-local"
                    name="endDate"
                    placeholder="End Date"
                  />
                  <FieldErrorMessage
                    errors={errors.endDate}
                    touched={touched.endDate}
                    msgText="Required"
                  />
                </div>
                {/*  --------------------- */}
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="description"
                    labelText="Description"
                    // required="required"
                  />
                  <FieldTypeTextarea
                    name="description"
                    component="textarea"
                    placeholder="Description"
                  />
                  <FieldErrorMessage
                    errors={errors.description}
                    touched={touched.description}
                    msgText="Required"
                  />
                </div>

                <div className="mb-3">
                  {initValues.files !== undefined &&
                    initValues.files.length > 0 && (
                      <React.Fragment>
                        <div>
                          <img
                            src={initValues.files[0].url}
                            alt={initValues.files[0].originalFileName}
                            width="150px"
                          />{" "}
                          <FieldTypeCheckbox
                            name="deleteImage"
                            checkboxLabel="Remove Picture"
                          />
                        </div>
                      </React.Fragment>
                    )}
                  <FieldLabel htmlfor="file" labelText="Program Picture" />
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
                <div className="mb-3">
                <FieldLabel htmlfor="programtype" labelText="Program Type" /> <br />
                  <label className="me-3">
                    <input
                      type="radio"
                      name="type"
                      value="major"
                      onChange={handleChange}
                      checked={values.type === "major"}
                    />
                   <span> Major</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="minor"
                      onChange={handleChange}
                      checked={values.type === "minor"}
                    />
                  <span> Minor</span>
                  </label>
                </div>
                <FieldErrorMessage
                    errors={errors.type}
                    touched={touched.type}
                  />
                {values.type === "minor" && (
                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="enrollmentCapacity"
                      labelText="Enrollment Capacity *"
                      min={0}
                      number
                      required="required"
                    />
                    <FieldTypeText
                      min={0}
                      type="number"
                      name="enrollmentCapacity"
                      placeholder="Enrollment Capacity"
                    />
                    <FieldErrorMessage
                      errors={errors.enrollmentCapacity}
                      touched={touched.enrollmentCapacity}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <FieldTypeCheckbox
                    name="published"
                    checkboxLabel="Published"
                  />{" "}
                  <FieldErrorMessage
                    errors={errors.published}
                    touched={touched.published}
                    msgText="Please Check Required Field"
                  />
                </div>
                {isSubmitting === false ? (
                  <div className="modal-buttons">
                    <CustomButton
                      type="submit"
                      variant="primary"
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
          <div style={{marginTop: "5px"}}>
          <TimerAlertBox
            alertMsg={alertMsg.message}
            className="mt-3"
            variant={alertMsg.alertBoxColor}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
          </div>
        </Modal.Body>
        <img src={WaveBottom} alt="WaveBottom" className="wavebg"/>
      </Modal>
    </React.Fragment>
  );
};

export default CourseModal;
