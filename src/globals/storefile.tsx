import { postData } from "../adapters/microservices";

export const uploadFile = (component: string, entityId : string | number, file: File, ) => {
    if (file !== null) {
        postData(`/files/${component}/${entityId}`, {}, file)
        .then((res: any) => {
            if (res.status === 200) {
                /// add success handlers
            }
        })
        .catch((err: any) => {
            console.log(err);
            if (err.response.status === 404) {
                // add failure handlers
            }
        });
    }
}

export const addRemoveFileProperty = (files: any) => {
    return files.map((file: any) => {
        return {
          ...file,
          deleted: true
        };
    });
}