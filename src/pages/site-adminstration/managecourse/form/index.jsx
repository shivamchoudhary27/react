import React, {useState, useEffect} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getData,
  postData as addCourseData,
  putData,
} from "../../../../adapters/microservices/index";
import Header from "../../../header";
import Sidebar from "../../../sidebar";
import { Formik, Form } from "formik";
import { Container, Button } from "react-bootstrap";
import FieldLabel from "../../../../widgets/form_input_fields/labels";
import FieldTypeText from "../../../../widgets/form_input_fields/form_text_field";
import FieldErrorMessage from "../../../../widgets/form_input_fields/error_message";
import FieldTypeTextarea from "../../../../widgets/form_input_fields/form_textarea_field";
import CustomButton from "../../../../widgets/form_input_fields/buttons";
import FieldTypeCheckbox from "../../../../widgets/form_input_fields/form_checkbox_field";
import FieldTypeSelect from "../../../../widgets/form_input_fields/form_select_field";
import * as Yup from "yup";
import { getLatestWeightForCategory, updateCategoryLevels, getChildren } from "../utils";
import { setHasChildProp, resetManageCourseObj } from '../local';


// Formik Yup validation === >>>
const formSchema = Yup.object({
  name: Yup.string().min(1).required(),
  // description: Yup.string().max(100).required(),
});

const AddCourseForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { progid, catid, courseid } = useParams();
  const parsedCourseid = parseInt(courseid);
  const [courseDetail, setCourseDetails] = useState({})
  const [categorieslist, setCategoriesList] = useState([]);
  const [filteredCategories, setFilterCategories] = useState([]);
  const [filterUpdate, setFilterUpdate] = useState({
    pageNumber: 0,
    // pageSize: pagination.PERPAGE,
    pageSize: 100,
  });
  const [initValues, setInitValues] = useState({
    name: "",
    courseCode: "",
    category:catid,
    description: "",
    published: false
  });

  console.log(filteredCategories);
  // Get category Data from API === >>
  useEffect(() => {
    if (parsedCourseid > 0) {
      const endPoint = `/${progid}/course`;
      let filters = {Id: courseid, pageNumber: 0, pageSize: 1}
      getData(endPoint, filters)
        .then((res) => { 
          if (res.status === 200) {
            if (res.data.items.length === 1) {
              let requestedcourse = res.data.items[0];
              setCourseDetails(requestedcourse);
              setInitValues({
                id: requestedcourse.id, 
                name: requestedcourse.name,
                courseCode: requestedcourse.courseCode,
                description: requestedcourse.description,
                published: requestedcourse.published,
                category:catid
              })
            } else {
              window.alert('No course details were found for requested course ');
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // Get category Data from API === >>
  useEffect(() => {
    getCategoriesData();
  }, []);

  // useEffect(() => {
  //   setInitValues({...initValues, category: categorieslist})
  // }, [categorieslist]);

  const getCategoriesData = () => {
    const endPoint = `/${progid}/category`;
    getData(endPoint, filterUpdate)
      .then((res) => { 
        if (res.data !== "" && res.status === 200) {
          setCategoriesList(res.data.items);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (categorieslist.length > 0) {
      const convertedResult = categorieslist.filter(item => item.parent === 0)
                            .sort((a,b) => a.weight - b.weight)
                            .reduce((acc, item) => [...acc, item, ...getChildren(item, categorieslist)], []);
      
      convertedResult.forEach(item => {
        if (item.parent === 0) {
          item.level = 1;
          updateCategoryLevels(convertedResult, item.id, 2);
        }
      });
      const hasChildPropAdded = setHasChildProp(convertedResult);
      const filteredArr = hasChildPropAdded.filter(obj => obj.haschild === false);
      setFilterCategories(filteredArr);
    }
  }, [categorieslist]);

  // handle Form CRUD operations === >>>
  const handleFormData = (values, { setSubmitting, resetForm }) => {
    console.log('form values after submission', values);
    let requestData =  {...values, category: {id: values.category}} 
    if (parsedCourseid === 0) {
      const endPoint = `${progid}/course`;
      addCourseData(endPoint, requestData).then((res)=>{
        if(res.status === 201){
          window.alert('Create successul');
          navigate(`/managecourses/${progid}`);
        }
      }).catch((err)=>{
        console.log(err)
      })
    } else {
      const endPoint = `${progid}/course/${parsedCourseid}`;

      putData(endPoint, requestData)
        .then((res) => {
          if (res.status === 200) {
            window.alert('Update successul');
            navigate(`/managecourses/${progid}`);
          }
        })
        .catch((err) => {
          window.alert("Some error occurred!");
        });
    }
    // resetForm();
  };

  return (
    <>
      <Header
        pageHeading={`Manage Courses: ${location.state}`}
        welcomeIcon={false}
      />
      <div className="main-content-container">
        <Sidebar />
        <div
          className="content-area content-area-slider"
          id="contentareaslider"
        >
          <Container fluid className="administration-wrapper">
            <Button
              variant="outline-secondary"
              onClick={() => navigate(`/managecourses/${progid}/`)}
            >
              Go back
            </Button>
            <hr />
            <Formik
              enableReinitialize={true}
              initialValues={initValues}
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
                      star="*"
                    />
                    <FieldTypeText name="name" placeholder="Name" />
                    <FieldErrorMessage
                      errors={errors.name}
                      touched={touched.name}
                      msgText="Name required atleast 1 character"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="courseCode"
                      labelText="Course Code"
                      required="required"
                      star="*"
                    />
                    <FieldTypeText name="courseCode" placeholder="Course Code" />
                    <FieldErrorMessage
                      errors={errors.name}
                      touched={touched.name}
                      msgText="Code required atleast 1 character"
                    />
                  </div>

                  <div className="mb-3">
                <FieldLabel
                  htmlfor="category"
                  labelText="Category"
                  required="required"
                  star="*"
                />
                <FieldTypeSelect
                  name="category"
                  options={filteredCategories}
                  setcurrentvalue={setValues}
                  currentformvalue={values}
                />
                <FieldErrorMessage
                  errors={errors.department}
                  touched={touched.department}
                  msgText="Please select Department"
                />
              </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="description"
                      labelText="Description"
                      // required="required"
                      // star="*"
                    />
                    <FieldTypeTextarea
                      name="description"
                      component="textarea"
                      placeholder="Description"
                    />
                    <FieldErrorMessage
                      errors={errors.description}
                      touched={touched.description}
                      msgText="Please Enter description"
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
                      msgText="Please Check required field"
                    />
                  </div>
                  <div className="text-center">
                    <CustomButton
                      type="submit"
                      variant="primary"
                      // isSubmitting={isSubmitting}
                      btnText="Save"
                    />{" "}
                    <CustomButton
                      type="reset"
                      btnText="Reset"
                      variant="outline-secondary"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </Container>
        </div>
      </div>
    </>
  );
};

export default AddCourseForm;
