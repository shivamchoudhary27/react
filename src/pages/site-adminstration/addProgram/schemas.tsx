import * as Yup from "yup";

export const Schemas = Yup.object({
  department: Yup.string().required(),
  programName: Yup.string().min(3).trim().required(),
  programCode: Yup.string().min(3).trim().required(),
  discipline: Yup.string().required(),
  programtype: Yup.string().required(),
  // batchYear: Yup.string().required(),
  // mode: Yup.string().required(),
});
