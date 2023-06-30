import { getData as learningServiceGetData } from "../../../adapters/microservices";
import { getData as coreServiceGetData } from "../../../adapters/coreservices";

// central get api data method
// can also add a param to setError also if something wrong happen
// or make it a standard for this app that
// every state that store data from api have the structure of
// { data: [],  status: '', error: {} / "whatever"}
export const makeGetDataRequest = (endPoint : string, filters : any, setData : any, setApiStatus?:any, service?:string) => {
    let getData = learningServiceGetData;
    if (service === 'core-service') {
        getData = coreServiceGetData
    }
    {setApiStatus && setApiStatus("started")}
    getData(endPoint, filters)
        .then((result : any) => {
            if (result.data !== "" && result.status === 200) {
                // if (result.data.items.length < 1) {
                // }
                setData(result.data);
            }
            {setApiStatus && setApiStatus("finished")}
        })
        .catch((err : any) => {
            console.log(err);
            {setApiStatus && setApiStatus("finished")}
        });
}

// add error handlers if api throws errors in this files , so it can work for any api call
// and show errors like catch errors , show an alert box for errors