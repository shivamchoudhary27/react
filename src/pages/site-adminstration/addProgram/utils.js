export const initialValues = {
    department: "",
    programName: '',
    programCode: "",
    programtype: "",
    discipline: "",
    batchYear: "",
    modeOfStudy: "",
    duration: "",
    objective: "",
    description: "",
    programcontent: "",
    learn: "",
    metatitle: "",
    metadescription: "",
    checked: [],
};

export const addMetaInputField = [
    [
        {
            type: "text",
            id: 1,
            value: "",
        },
        {
            type: "textarea",
            id: 2,
            value: "",
        },
    ],
];

export const modeStudy = [
   { name: "Full Time", value : "fulltime"},
   { name: "Part Time", value : "parttime"},
];

const programData = {
    name: "",
    programCode: "",
    modeOfStudy: "",
    duration: "",
    batchYear: 0,
    desscription: "",
    objective: "",
    fullLifeTimeAccess: false,
    published: false,
    programType: {},
    department: {},
    discipline: {}
}

export const generateProgramDataObject = (formData) => {
    programData.name = formData.programName;
    programData.programCode = formData.programCode;
    programData.modeOfStudy = formData.modeOfStudy;
    programData.duration = formData.duration;
    programData.batchYear = parseInt(formData.batchYear);
    programData.description = formData.description;
    programData.objective = formData.objective;
    programData.fullLifeTimeAccess = true;
    programData.published = true;
    programData.programType = { id  : 50};
    programData.department = {id : formData.department};
    programData.discipline = {id : formData.discipline};

    return programData;
};

export const generateIinitialValues = (apiData) => {
    if (Object.keys(apiData).length > 0) {
        let setInitialValues = {
            department: apiData.department.id,
            programName: apiData.name,
            programCode: apiData.programCode,
            programtype: apiData.programType.id,
            discipline: apiData.discipline.id,
            batchYear: apiData.batchYear,
            mode: apiData.modeOfStudy,
            duration: apiData.duration,
            objective: apiData.objective ?? '',
            description: apiData.description,
        }
       return setInitialValues;
    }  else {
        return initialValues;
    }
}