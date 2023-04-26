// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { postData } from '../../../adapters/microservices';
// import * as Yup from 'yup';

// const validationSchema = Yup.object().shape({
//   file: Yup.mixed().required('File is required'),
// });

// const FileUploadForm = () => {
//   const onSubmit = (values) => {

//     console.log(values.file);

//     postData('/csv/program-user-erol/133', {}, values.file)
//       .then((res) => {
//         console.log('res', res);
//       })
//       .catch((err) => {
//         console.log('error', err);
//       });
//   };

//   return (
//     <React.Fragment>
//       <Formik
//         initialValues={{ file: null }}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         {({ values, setFieldValue, errors, touched }) => (
//           <Form>
//             <div>
//               <label htmlFor="file">Upload a file:</label>
//               <input
//                 id="file"
//                 name="file"
//                 type="file"
//                 onChange={(event) => {
//                   setFieldValue('file', event.currentTarget.files[0]);
//                 }}
//               />
//               <ErrorMessage name="file" />
//             </div>

//             <button type="submit" disabled={!values.file}>
//               Submit
//             </button>

//             <pre>{JSON.stringify({ values, errors, touched }, null, 2)}</pre>
//           </Form>
//         )}
//       </Formik>
//     </React.Fragment>
//   );
// };

// export default FileUploadForm;

// import React, { useState } from 'react';
// import Papa from 'papaparse'; // library for parsing CSV files

// function FileUploadForm() {
//   const [tableData, setTableData] = useState([]);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     Papa.parse(file, {
//       header: true,
//       complete: (result) => {
//         setTableData(result.data);
//       },
//     });
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       {tableData.length > 0 && (
//         <table>
//           <thead>
//             <tr>
//               <th>#</th>
//               {Object.keys(tableData[0]).map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 {Object.values(row).map((value, index) => (
//                   <td key={index}>{value}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default FileUploadForm;
