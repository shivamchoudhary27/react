import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldTypeSelect from "../../../widgets/formInputFields/formSelectField";
import FieldTypeTextarea from "../../../widgets/formInputFields/formTextareaField";
import FieldTypeCheckbox from "../../../widgets/formInputFields/formCheckboxField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import { getData, postData, putData } from "../../../adapters/microservices";
import { getChildren, updateCategoryLevels } from "./utils";
import { setHasChildProp } from "./local";

// Formik Yup validation === >>>
const formSchema = Yup.object({
    name: Yup.string().trim().required(),
    courseCode: Yup.string().trim().required(),
    category: Yup.string().required(),
    // description: Yup.string().max(100).required(),
  });

const CourseModal = ({ show, onHide, courseobj, programId, toggleCourseModal, refreshcategories }: any) => {
    
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
  });
  
  // Get category Data from API === >>
  useEffect(() => {
    // if (courseobj.id > 0) {
      setInitValues({
        id: courseobj.id,
        name: courseobj.name,
        courseCode: courseobj.courseCode,
        description: courseobj.description,
        published: courseobj.published,
        category: courseobj.category,
      });
    // }
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
  const handleFormData = (values : {}, { setSubmitting, resetForm } : any) => {
    let requestData = { ...values, category: { id: values.category } };
    if (courseobj.id == 0) {
      const endPoint = `${programId}/course`;
      postData(endPoint, requestData).then((res : any)=>{
        if(res.status === 201){
          // window.alert('Course created successfully');
        }
        toggleCourseModal(false);
        refreshcategories()
      }).catch((err : any)=>{
        console.log(err)
      })
    } else {
      const endPoint = `${programId}/course/${courseobj.id}`;

      putData(endPoint, requestData)
        .then((res : any) => {
          if (res.status === 200) {
            // window.alert("Update succesful");
          }
          toggleCourseModal(false);
          refreshcategories();
        })
        .catch((err : any) => {
          window.alert("Some error occurred!");
          toggleCourseModal(false);
        });
    }
    // resetForm();
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
            {({ errors, touched, isSubmitting, setValues, values }) => (
              <Form>
                <div className="mb-3">
                  <FieldLabel
                    htmlfor="name"
                    labelText="Name"
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
                    labelText="Course Code"number
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
                  />
                  <FieldErrorMessage
                    errors={errors.category}
                    touched={touched.category}
                    msgText="Please Select Category"
                  />
                </div>

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
                <div className="modal-buttons">
                  <CustomButton
                    type="submit"
                    variant="primary"
                    // isSubmitting={isSubmitting}
                    btnText={courseobj.id === 0 ? "Save" : "Update"}
                  />{" "}
                  {courseobj.id === 0 && (
                    <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default CourseModal;