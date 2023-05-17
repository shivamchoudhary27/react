import React, {useEffect, useState} from "react";
import { Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage } from 'formik';
import FieldLabel from "../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../widgets/formInputFields/formTextField";
import FieldErrorMessage from "../../../widgets/formInputFields/errorMessage";
import FieldTypeSelect from "../../../widgets/formInputFields/formSelectField";
import CustomButton from "../../../widgets/formInputFields/buttons";
import { CountryList } from "./countryDataList";
import * as Yup from "yup";
import { postData, getData, putData } from "../../../adapters/coreservices";

const initialValues = {
    username:"",
    lastName:"",
    firstName: "",
    email: "",
    password: "",
    // city: "",
    country: "",
    // idnumber: ""
  };

const AddUserModal = ({
  show,
  onHide,
  togglemodalshow,
  updateAddRefresh,
  programid
}: any) => {
    const navigate = useNavigate();
    // const { userid } = useParams();
    const parsedUserid = 0;
    const [formValues, setFormvalues] = useState(initialValues);
  
    useEffect(() => {
      if (parsedUserid > 0) {
        getData(`/user/${parsedUserid}`, {})
            .then((result : any) => {
                console.log(result);
                if (result.status === 200) {
                  result.data.password = "Admin@123";
                  setFormvalues(result.data);
                }
            })
            .catch((err : any) => {
                console.log(err);
            });
      }
    }, []);
  
    // Formik Yup validation === >>>
    const userFormSchema = Yup.object({
      username: Yup.string().trim().min(4).required(),
      password: Yup.string().min(6).trim().required(),
    //   idnumber: Yup.number().min(5).required(),
      email: Yup.string().email('Invalid email').required('Email is required'),
      firstName: Yup.string().min(1).trim().required(),
      lastName: Yup.string().min(1).trim().required(),
    //   city: Yup.string().min(1).trim().required(),
      country: Yup.string().required(),
    });
  
    // handle Form CRUD operations === >>>
    const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
      console.log(values)
      if (parsedUserid === 0) {
        postData('/user/', values)
        .then((res: any) => {
          if (res.status === 201) {
            navigate('/usermanagement');
          }
        })
        .catch((err: any) => {
          if (err.response.status === 404) {
            window.alert(err.response.data.message);
          }
        });
      } else {
        putData(`/user/${parsedUserid}`, values)
        .then((res: any) => {
          if (res.status === 200) {
            navigate('/usermanagement');
          }
        })
        .catch((err: any) => {
          console.log(err);
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
            Add User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formik
              enableReinitialize={true}
              initialValues={formValues}
              validationSchema={userFormSchema}
              onSubmit={(values, action) => {
                handleFormData(values, action);
              }}
            >
              {({ errors, touched, isSubmitting, setValues, values }) => (
                <Form className="mt-3">
                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="username"
                      labelText="Username"
                      required="required"
                    />
                    <FieldTypeText name="username" placeholder="Username" />
                    <FieldErrorMessage
                      errors={errors.username}
                      touched={touched.username}
                      msgText="Username is required with 4 characters minimum"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="password"
                      labelText="Password"
                      required="required"
                    />
                    <FieldTypeText type="password" name="password" placeholder="Password" />
                    <FieldErrorMessage
                      errors={errors.password}
                      touched={touched.password}
                      msgText="Password is required with 6 characters minimum"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="firstName"
                      labelText="Firstname"
                      required="required"
                    />
                    <FieldTypeText name="firstName" placeholder="First Name" />
                    <FieldErrorMessage
                      errors={errors.firstName}
                      touched={touched.firstName}
                      msgText="Firstname is required"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="lastName"
                      labelText="Lastname"
                      required="required"
                    />
                    <FieldTypeText name="lastName" placeholder="Last Name" />
                    <FieldErrorMessage
                      errors={errors.lastName}
                      touched={touched.lastName}
                      msgText="Lastname is required"
                    />
                  </div>

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="email"
                      labelText="Email"
                      required="required"
                    />
                    <FieldTypeText name="email" placeholder="Email" />
                    <FieldErrorMessage
                      errors={errors.email}
                      touched={touched.email}
                      msgText="Email is required"
                    />
                  </div>

                  {/* <div className="mb-3">
                    <FieldLabel
                      htmlfor="idnumber"
                      labelText="Idnumber"
                      required="required"
                    />
                    <FieldTypeText type="number" name="idnumber" placeholder="Id number" />
                    <FieldErrorMessage
                      errors={errors.idnumber}
                      touched={touched.idnumber}
                      msgText="Idnumber is required with minimun 4 and maximum 9 digits"
                    />
                  </div> */}

                  {/* <div className="mb-3">
                    <FieldLabel
                      htmlfor="city"
                      labelText="City"
                      required="required"
                    />
                    <FieldTypeText name="city" placeholder="City" />
                    <FieldErrorMessage
                      errors={errors.city}
                      touched={touched.city}
                      msgText="City is required"
                    />
                  </div> */}

                  <div className="mb-3">
                    <FieldLabel
                      htmlfor="country"
                      labelText="Country"
                      required="required"
                    />
                    <FieldTypeSelect
                      name="country"
                      options={CountryList}
                      setcurrentvalue={setValues}
                      currentformvalue={values}
                    />
                    <FieldErrorMessage
                      errors={errors.country}
                      touched={touched.country}
                      msgText="Please select Country"
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
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddUserModal;
