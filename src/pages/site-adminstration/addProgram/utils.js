export const initialValues = {
    department: 132,
    programName: 'initialvalues',
    programCode: "initialvalues",
    programtype: 83,
    discipline: "",
    batchYear: "initialvalues",
    mode: "part_time",
    duration: "initialvalues",
    requirement: "",
    description: "initialvalues",
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
    programData.programCode = formData.programCode,
    programData.modeOfStudy = formData.mode,
    programData.duration = formData.duration,
    programData.batchYear = parseInt(formData.batchYear),
    programData.desscription = formData.description,
    programData.objective = formData.requirement,
    programData.fullLifeTimeAccess = true,
    programData.published = true,
    programData.programType = { id  : 50},
    programData.department = {id : formData.department},
    programData.discipline = {id : formData.discipline}

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
            requirement: apiData.requirement ?? '',
            description: apiData.description,
        }
       return setInitialValues;
    }  else {
        return initialValues;
    }
}