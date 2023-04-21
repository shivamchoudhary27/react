import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../header';
import Sidebar from '../../sidebar';
import { Container, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import FieldLabel from '../../../widgets/form_input_fields/labels';
import FieldTypeText from '../../../widgets/form_input_fields/form_text_field';
import FieldErrorMessage from '../../../widgets/form_input_fields/error_message';
import CustomButton from '../../../widgets/form_input_fields/buttons';
import FieldTypeSelect from '../../../widgets/form_input_fields/form_select_field';
import { postData, putData } from '../../../adapters/microservices';
import { pagination } from '../../../utils/pagination';
import { makeGetDataRequest } from '../../../features/api_calls/getdata';

const roleData = [
  {id:"student", name: "Student"},
  {id:"manager", name: "Manager"},
  {id:"faculty", name: "Faculty"},
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
  const gobackLink = `/manageuserenrollment/${parsedProgramid}/${name}`;

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
      });
    }
  };

  return (
    <React.Fragment>
        <Header
        pageHeading="Add User To Program"
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
                        <input className="form-control" type="readonly" value={intialValues.userEmail} />
                      </>
                      :
                      <>
                        <FieldLabel
                          htmlfor="userEmail"
                          labelText="Email"
                          required="required"
                          star="*"
                        />
                        <FieldTypeText name="userEmail" placeholder="Email" />
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
      </div>
    </React.Fragment>
  )
}

export default EnrolUserToProgram;