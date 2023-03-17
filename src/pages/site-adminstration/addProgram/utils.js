// initial form values required by the program formik form
export const initialValues = {
    department: "",
    programName: '',
    programCode: "",
    programtype: "",
    discipline: "",
    batchYear: "",
    modeOfStudy: "fulltime",
    duration: "",
    objective: "",
    description: "",
    programcontent: "",
    learn: "",
    metatitle: "",
    metadescription: "",
    programaccessinfo: [],
    isBatchYearRequired: false
};

// a set of fields to be added or removed within the program form
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

//provided fields for modeofstudy in program 
export const modeStudy = [
   { name: "Full Time", value : "fulltime"},
   { name: "Part Time", value : "parttime"},
];

// the api required structure for program which will later be updated in generateProgramDataObject()
const programData = {
    name: "",
    programCode: "",
    modeOfStudy: "",
    duration: "",
    batchYear: 0,
    description: "",
    objective: "",
    fullLifeTimeAccess: false,
    published: false,
    programType: {id: ''},
    department: {id: '' },
    discipline: {id: ''}
}

// to convert program formdata to api required structure after the form submission
export const generateProgramDataObject = (formData) => {
    programData.name = formData.programName;
    programData.programCode = formData.programCode;
    programData.modeOfStudy = formData.modeOfStudy;
    programData.duration = formData.duration;
    programData.batchYear = parseInt(formData.batchYear);
    programData.description = formData.description;
    programData.objective = formData.objective;
    programData.fullLifeTimeAccess = formData.programaccessinfo.includes("fullaccess");
    programData.published = formData.programaccessinfo.includes("published");
    programData.programType = {id : formData.programtype} ;
    programData.department = {id : formData.department};
    programData.discipline = {id : formData.discipline};
    
    return programData;
};

//method to provide the final initialvalues to be filled in the program form
export const generateIinitialValues = (apiData) => {
    if (Object.keys(apiData).length > 0) {
        
        let pgInfo = [];
        if (programData.fullLifeTimeAccess === true) pgInfo.push("fullaccess")
        if (programData.published === true) pgInfo.push("published")

        let setInitialValues = {
            department: apiData.department.id,
            programName: apiData.name,
            programCode: apiData.programCode,
            programtype: apiData.programType.id,
            discipline: apiData.discipline.id,
            batchYear: apiData.batchYear,
            modeOfStudy: apiData.modeOfStudy,
            duration: apiData.duration,
            objective: apiData.objective ?? '',
            description: apiData.description,
            programaccessinfo: pgInfo,
            isBatchYearRequired: false,
        }
       return setInitialValues;
    }  else {
        return initialValues;
    }
}

//add extra information to initialvalues for the form
export const addExtraMetaDataToInitialValues = (initialvalues, metadata, property) => {
   initialvalues[property] = metadata;
   return initialvalues;
}