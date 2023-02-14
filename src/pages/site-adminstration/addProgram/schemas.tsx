import * as Yup from "yup";

export const Schemas = Yup.object({
  department: Yup.string()
    .min(3, "must have atleast 3 character")
    .max(25, "not more than 25 character")
    .matches(/^[a-zA-Z]*$/, "Department name is not valid")
    .required("Please Enter Department"),
  programName: Yup.string()
    .min(3)
    .max(25)
    .required("Please Enter Program Name"),
  programCode: Yup.string()
    .min(3)
    .max(25)
    .required("Please Enter Program Code"),
  select: Yup.string().required("Please Enter Program Code"),
  batchYear: Yup.number().positive().required("Please Enter Batch Year"),
  duration: Yup.number().positive().required(),
  requirement: Yup.string().max(100).required(),
  description: Yup.string().max(100).required(),
  programcontent: Yup.string().max(100).required(),
  learn: Yup.string().max(100).required(),
  metatitle: Yup.string().min(3).max(15).required(),
  metadescription: Yup.string().max(100).required(),
  programinclude: Yup.string().required(),
});
