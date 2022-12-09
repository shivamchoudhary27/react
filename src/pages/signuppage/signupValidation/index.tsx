import * as Yup from "yup";
const signUpSchema = Yup.object({
  fname: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your First name"),
  lname: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your Last name"),
  email: Yup.string()
    .email()
    .required("Please enter your email"),
  pass: Yup.string()
    .min(6)
    .required("Please enter your password")
});
export default signUpSchema;
