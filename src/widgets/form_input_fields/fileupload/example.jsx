import React from 'react';
import { useFormik } from 'formik';

const FileUploadForm = () => {
  const formik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('file', values.file);

      // Send formData to server using fetch or axios
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('file', event.currentTarget.files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit} enctype="multipart/form-data">
      <label htmlFor="file">Upload a file:</label>
      <input
        id="file"
        name="file"
        type="file"
        onChange={handleFileChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default FileUploadForm;
