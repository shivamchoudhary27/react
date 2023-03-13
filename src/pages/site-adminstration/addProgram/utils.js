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

    console.log(programData);
    return programData;
};



// {
//     "name": "Basic Computer 2345",
//     "programCode": "basic2345",
//     "modeOfStudy": "online",
//     "duration": "4 hours",
//     "batchYear": 2023,
//     "desscription": "loresm dsfsadfasdf",
//     "objective": "loresm dsfsadfasdf",
//     "fullLifeTimeAccess": true,
//     "published": true,
//     "programType": {
//         "id": 50
//     },
//     "department": {
//         "id": 131
//     },
//     "discipline": {
//         "id": 34
//     }
// }