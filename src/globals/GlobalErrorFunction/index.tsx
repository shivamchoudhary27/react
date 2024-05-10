const handleGlobalError = (err:any, setShowAlert:any, setAlertMsg:any) => {
    
    setShowAlert(true); // Show alert box to inform the user about the error
    
    let message = "An error occurred";
    let alertBoxColor = "danger"; // Default color for error alerts
    
    if (err.response && err.response.status) {
        switch (err.response.status) {
            case 200:
                message = "hello";
                break;
            case 400:
                message = err.response.data && err.response.data.message ? err.response.data.message : "Bad Request";
                break;
            case 401:
                message = err.response.data && err.response.data.message ? err.response.data.message :"Unauthorized";
                break;
            case 403:
                message = err.response.data && err.response.data.message ? err.response.data.message :"Forbidden";
                break;
            case 404:
                message = err.response.data && err.response.data.message ? err.response.data.message :"Resource not found";
                break;
            case 500:
                message = err.response.data && err.response.data.message ? err.response.data.message :"Internal Server Error";
                break;
            case 502:
                message = err.response.data && err.response.data.message ? err.response.data.message :"Bad Gateway";
                break;
            default:
                message = err.response.data && err.response.data.message ? err.response.data.message : "An unexpected error occurred";
                break;
        }
    } else {
        // Handle non-HTTP errors, if any
        message = "An unexpected error occurred";
    }

    setAlertMsg({
        message: message,
        alertBoxColor: alertBoxColor,
    });
};
