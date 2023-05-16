import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import { Container, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import FieldLabel from '../../../widgets/formInputFields/labels';
import FieldTypeText from '../../../widgets/formInputFields/formTextField';
import FieldErrorMessage from '../../../widgets/formInputFields/errorMessage';
import CustomButton from '../../../widgets/formInputFields/buttons';
import FieldTypeSelect from '../../../widgets/formInputFields/formSelectField';
import { postData, putData } from '../../../adapters/microservices';
import { pagination } from '../../../utils/pagination';
import { makeGetDataRequest } from '../../../features/api_calls/getdata';

const roleData = [
  {id:"manager", name: "Manager"},
  {id:"student", name: "Student"},
  {id:"editingteacher", name: "Teacher"},
  {id:"teacher", name: "Non-editing teacher"},
];

const dummyInitValues = {
  userEmail: "",
  roleNumber:"",
  role:""
};

const EnrolUserToProgram = () => {
  const navigate = useNavigate();
  const { programid, userid, name } = useParams();
  const parsedProgramid = parseInt(programid);
  const parsedUserid = parseInt(userid);
  const dummyData = {items: [dummyInitValues], pager: {totalElements: 0, totalPages: 0}}
  const [userEnrol, setUserEnrol] = useState<any>(dummyData);
  const filter = {
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
    userId : (parsedUserid > 0) ? parsedUserid : ''
  };
  const [intialValues, setInitialvalues] = useState({});
  const gobackLink = `/manageprogramenrollment/${parsedProgramid}/${name}`;

  useEffect(() => {
    if (parsedUserid > 0) {
      makeGetDataRequest(`program/${programid}/enrol-user`, filter, setUserEnrol); 
    }
  }, []);

  useEffect(() => {
    if (userEnrol.items.length === 1) {
      let enrolData = userEnrol.items[0];
      let formvalues = {
        userEmail: enrolData.userEmail,
        roleNumber: enrolData.roleNumber,
        role: enrolData.role    
      }
      setInitialvalues(formvalues);
    }
  }, [userEnrol]);

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, action: any) => {
    if (parsedUserid > 0) {
      console.log(JSON.stringify(values));
      putData(`/program/${parsedProgramid}/enrol-user/${parsedUserid}`, values)
      .then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          navigate(gobackLink);
        }
      })
      .catch((err: any) => {
        console.log(err);
        if (err.response.status === 400) {
          window.alert(err.response.data.message);
        }
      });
    } else {
      postData(`program/${parsedProgramid}/enrol-user`, values)
      .then((res: any) => {
        if (res.status === 201) {
          navigate(gobackLink);
        }
      })
      .catch((err: any) => {
        if (err.response.status === 400) {
          window.alert(err.response.data.message);
        }
        if (err.response.status === 404) {
          window.alert(err.response.data.message);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs />
      <div className="main-content-container">
          <Container fluid className="administration-wrapper"> 
            <BreadcrumbComponent
              routes={[
                { name: "Site Administration", path: "/siteadmin" },
                { name: name, path: gobackLink },
                { name: "Program Preview", path: "" },       
              ]}
            />
            <h3>Program Preview</h3>
            <Button
              variant="outline-secondary"
              onClick={() => navigate(gobackLink)}
            >
              Go back
            </Button>
            <hr />
            <Formik
              enableReinitialize={true}
              initialValues={intialValues}
              onSubmit={(values, action) => {handleFormData(values)}}
            >
              {({ errors, touched, isSubmitting, setValues, values }) => (
                <Form>
                  <div className="mb-3">
                    {
                      parsedUserid > 0 
                      ?
                      <>
                        <label>Email</label><br />
                        <input className="form-control" type="email" value={intialValues.userEmail} disabled/>
                      </>
                      :
                      <>
                        <FieldLabel
                          htmlfor="userEmail"
                          labelText="Email"
                          required="required"
                          star="*"
                        />
                        <FieldTypeText  
                          name="userEmail" 
                          placeholder="Email"
                          type="email" 
                        />
                        <FieldErrorMessage
                          errors={errors.userEmail}
                          touched={touched.userEmail}
                          msgText="Email required"
                        />
                      </>
                    }
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="roleNumber"
                      labelText="Role No"
                      required="required"
                      star="*"
                    />
                    <FieldTypeText name="roleNumber" placeholder="Role No" />
                    <FieldErrorMessage
                      errors={errors.roleNumber}
                      touched={touched.roleNumber}
                      msgText="role no required"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="role"
                      labelText="Role"
                      required="required"
                      star="*"
                    />
                    <FieldTypeSelect
                      name="role"
                      options={roleData}
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                    />
                    <FieldErrorMessage
                      errors={errors.role}
                      touched={touched.role}
                      msgText="Please select Role"
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
      <Footer />   
    </React.Fragment>
  )
}

export default EnrolUserToProgram;