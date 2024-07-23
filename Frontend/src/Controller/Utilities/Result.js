export const ApiSuccess = (data, error = 0, message = "Success") => {
    return { data: data, error: error, message: message };
};
export const ApiFailure = (error, message = "Mereko kya maloom...") => {
    if (typeof error == "number") {
        return { data: null, error: error, message: message };
    }
    if (error instanceof Error) {
        return {
            data: null,
            error: -1,
            message: error.name + ": " + error.message,
        };
    }
};
