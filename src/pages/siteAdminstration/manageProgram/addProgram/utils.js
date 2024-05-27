// initial form values required by the program formik form
export const initialValues = {
    department: "",
    programName: '',
    programCode: "",
    programtype: "",
    discipline: "",
    batchYear: getCurrentBatchYear(),
    modeOfStudy: "Full time",
    durationValue: 0,
    durationUnit : 'day',
    objective: "",
    description: "",
    programcontent: "",
    learn: "",
    meta: [],
    programaccessinfo: [],
    isBatchYearRequired: false,
    tags: [],
    published: false,
    file: null,
    files: [],
    deleteImage: false,
    userSelfUnernolmentAllowed: "false",
    waitListProcessMode: "manual",
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
// export const modeStudy = [
//    { name: "Full time", value : "Full time"},
//    { name: "Part time", value : "Part time"},
// ];

// the api required structure for program which will later be updated in generateProgramDataObject()
const programData = {
    name: "",
    programCode: "",
    modeOfStudy: "",
    durationValue: "",
    durationUnit: "",
    batchYear: "",
    description: "",
    objective: "",
    fullLifeTimeAccess: false,
    published: false,
    programType: {id: ''},
    department: {id: '' },
    discipline: {id: ''},
    metaFields: [{title: '', description: ''}],
    tags: [{id: ""}],
    file: null,
    files: [],
    deleteImage: false,
    userSelfUnernolmentAllowed: "false",
    waitListProcessMode: "manual",
}

// to convert program formdata to api required structure after the form submission
export const generateProgramDataObject = (formData) => {
    const submittedTags = convertFormSubmittedTagsData(formData.tags);
    programData.name = formData.programName;
    programData.programCode = formData.programCode;
    programData.modeOfStudy = formData.modeOfStudy;
    programData.durationValue = formData.durationValue;
    programData.durationUnit = formData.durationUnit;
    programData.batchYear = (formData.isBatchYearRequired) ? (formData.batchYear === "") ? 2023 : formData.batchYear : 0;
    programData.description = formData.description;
    programData.objective = formData.objective;
    programData.fullLifeTimeAccess = formData.fullLifeTimeAccess;
    programData.published = formData.published;
    programData.programType = {id : formData.programtype} ;
    programData.department = {id : formData.department};
    programData.discipline = {id : formData.discipline};
    programData.metaFields = getMetaFields(formData.meta)
    programData.tags = submittedTags;
    programData.files = formData.files;
    programData.userSelfUnernolmentAllowed = formData.userSelfUnernolmentAllowed;
    programData.waitListProcessMode = formData.waitListProcessMode;
    


    return programData;
};

const convertFormSubmittedTagsData = (tags) => {
    const filteredArray = tags.filter(value => value !== 0);  // to remove value zero
    const newArray = filteredArray.map(id => {
        return { id: parseInt(id) };
    });
    return newArray;
}

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
            durationValue: apiData.durationValue,
            durationUnit: apiData.durationUnit,
            objective: apiData.objective ?? '',
            description: apiData.description,
            programaccessinfo: pgInfo,
            isBatchYearRequired: apiData.programType.batchYearRequired ?? false,
            meta: apiData.metaFields,
            tags: apiData.tags.map(obj => obj.id),
            published: apiData.published,
            fullLifeTimeAccess: apiData.fullLifeTimeAccess,
            files: apiData.files,
            userSelfUnernolmentAllowed: apiData.userSelfUnernolmentAllowed,
            waitListProcessMode: apiData.waitListProcessMode?.toLowerCase(),
            deleteImage: false
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

export const generateAcademicYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = -5; i <= 10; i++) {
        const startYear = currentYear + i;
        const endYear = startYear + 1;
        const yearString = `${startYear}-${endYear.toString().substr(2)}`; 
        const yearObj = { id: yearString, name : yearString}
        years.push(yearObj);
    }
    return years;
};

export const durationTypeObj = () => {
    return [
        {id: 'year', name: 'Years'},
        {id: 'month', name: 'Months'},
        {id: 'week', name: 'Weeks'},
        {id: 'day', name: 'Days'},
    ]
}

const getMetaFields = (metaFieldsData) => {
    const newArr = metaFieldsData.filter(el => (el !== undefined));
    return newArr;
}

const getTagsField = (tagsFildData) => {
    const newArr = tagsFildData.filter(el => (el !== undefined));
    return (newArr);
}

function getCurrentBatchYear () {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return `${currentYear}-${nextYear.toString().substr(2)}`;
};