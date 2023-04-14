import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  file: Yup.mixed().required('File is required'),
});

const onSubmit = (values) => {
  console.log(values.file);
  const reader = new FileReader();
  reader.readAsDataURL(values.file);
  reader.onload = () => {
    const base64 = reader.result;
    console.log(base64);
  };
};

// const onSubmit = async (values) => {
//   const formData = new FormData();
//   formData.append('file', values.file);

//   try {
//     const response = await axios.post('https://example.com/upload', formData);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

const FileUploadForm = () => {
  return (
    <Formik
      initialValues={{ file: null }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="file">Upload a file:</label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                setFieldValue('file', event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="file" />
          </div>

          <button type="submit" disabled={!values.file}>
            Submit
          </button>

          <pre>{JSON.stringify({ values, errors, touched }, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default FileUploadForm;
