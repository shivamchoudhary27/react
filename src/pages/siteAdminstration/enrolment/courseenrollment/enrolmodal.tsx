import { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Formik, Form } from "formik";
import { postData, putData } from "../../../../adapters/microservices";
import { makeGetDataRequest } from "../../../../features/api_calls/getdata";
import { pagination } from "../../../../utils/pagination";
import * as Yup from "yup";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import FieldTypeText from "../../../../widgets/formInputFields/formTextField";
import Custom_Button from "../../../../widgets/formInputFields/buttons";
import FieldErrorMessage from "../../../../widgets/formInputFields/errorMessage";
import FieldMultiSelect from '../../../../widgets/formInputFields/multiSelect';

// Formik Yup Validation === >>>
const diciplineSchema = Yup.object({
  userEmail: Yup.string().email().required(''),
});

const DiciplineModal = ({
  disciplineobj,
  togglemodalshow,
  refreshDisciplineData,
  show,
  onHide,
  courseid
}: any) => {

  // Initial values of react table === >>>
  const initialValues = {
    userEmail: disciplineobj.userEmail,
    groups: disciplineobj.groups.map((obj : any ) => obj.id)  
  };
  const dummyData = {
    items: [],
    pager: { totalElements: 0, totalPages: 0 },
  };
  const [groupData, setGroupData] = useState(dummyData);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE * 5,
  });

  // custom Obj & handle form data === >>>
  let formTitles = {
    btnTitle: "",
    titleHeading: "",
  };
  if (disciplineobj.id === 0) {
    formTitles = {
      btnTitle: "Save",
      titleHeading: "Enrol User",
    };
  }else{
    formTitles = {
      btnTitle: "Save",
      titleHeading: "Enrol User",
    };
  }

  useEffect(() => {
    makeGetDataRequest(
      `/${courseid}/group`,
      filterUpdate,
      setGroupData
    );
  }, []);
  
  const convertFormSubmittedTagsData = (tags : any) => {
    const filteredArray = tags.filter((value : any )=> value != 0);  // to remove value zero
    const newArray = filteredArray.map((id :any) => {
        return { id: parseInt(id) };
    });
    return newArray;
  }

  // handle Form CRUD operations === >>>
  const handleFormData = (values: {}, { setSubmitting, resetForm }: any) => {
    values.groups = convertFormSubmittedTagsData(values.groups);

    setSubmitting(true);
    if(disciplineobj.userId === 0){
      let endPoint = `/course/${courseid}/enrol-user`;
      postData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "") {
            togglemodalshow(false);
            refreshDisciplineData();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
          if (err.response.status === 404 || err.response.status === 400) {
            if (err.response.data.userEmail !== undefined) {
              window.alert(err.response.data.userEmail);
            } else {
              window.alert(err.response.data.message);
            }
          }
        })
    }else{
      let endPoint = `/course/${courseid}/enrol-user/${disciplineobj.userId}`;
      putData(endPoint, values)
        .then((res: any) => {
          if (res.data !== "" && res.status === 200) {
            togglemodalshow(false);
            refreshDisciplineData();
            setSubmitting(false);
            resetForm();
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {formTitles.titleHeading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={diciplineSchema}
          onSubmit={(values, action) => {
            handleFormData(values, action);
            action.resetForm();
          }}
        >
          {({ values, errors, touched, isSubmitting, setValues }) => (
            <Form>
              <div className="mb-3">
                <FieldLabel
                  htmlfor="userEmail"
                  labelText="Email"
                  required="required"
                />
                <FieldTypeText name="userEmail" placeholder="User Email" />
                <FieldErrorMessage
                  errors={errors.userEmail}
                  touched={touched.userEmail}
                  msgText="Enter proper user email address"
                />
              </div>          
              <div className="mb-3">
                <FieldLabel
                  htmlfor="groups"
                  labelText="Group"
                  // required="required"
                />
                <FieldMultiSelect
                  name="groups"
                  options={groupData.items}
                />
                <FieldErrorMessage
                  errors={errors.groupId}
                  touched={touched.groupId}
                  // msgText="Please select Discipline"
                />
              </div>    
              <div className="text-center">
                <Custom_Button
                  type="submit"
                  variant="primary"
                  isSubmitting={isSubmitting}
                  btnText={formTitles.btnTitle}
                />{" "}
                {/* {formTitles.btnTitle === "Save" && ( */}
                  <Custom_Button
                    type="reset"
                    btnText="Reset"
                    variant="outline-secondary"
                  />
                 {/* )} */}
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DiciplineModal;
