import * as Yup from "yup";

export const Schemas = Yup.object({
  department: Yup.string().required(),
  programName: Yup.string().min(3).max(25).required(),
  programCode: Yup.number().positive().required(),
  discipline: Yup.string().required(),
  batchYear: Yup.number().positive().required(),
  duration: Yup.number().positive().required(),
  requirement: Yup.string().max(100).required(),
  description: Yup.string().max(100).required(),
  programcontent: Yup.string().max(100).required(),
  learn: Yup.string().max(100).required(),
  metatitle: Yup.string().min(3).max(15).required(),
  metadescription: Yup.string().max(100).required(),
  mode: Yup.string().required(),
  programtype: Yup.string().required(),
  // programinclude: Yup.string().required(),
});
