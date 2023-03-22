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
    meta: [],
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

export const addMetaFields = (fieldsCount) => {
    let fields = [];
    fieldsCount = (fieldsCount === 0) ? 1 : fieldsCount;
    for(let i = 1; i <= fieldsCount; i++) {
        fields.push(addMetaInputField);
    }
    return fields;
}

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
    discipline: {id: ''},
    metaFields: [{title: '', description: ''}]
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
    programData.metaFields = getMetaFields(formData.meta)
    return programData;
};

//method to provide the final initialvalues to be filled in the program form
export const generateIinitialValues = (apiData) => {
    console.log('raw api data', apiData)
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
            meta: apiData.metaFields,
        }
        console.log('data for form ' , setInitialValues);
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

const getMetaFields = (metaFieldsData) => {
    const newArr = metaFieldsData.filter(el => (el !== undefined));
    return newArr;
}