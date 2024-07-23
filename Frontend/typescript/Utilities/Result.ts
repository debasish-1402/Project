export const ApiSuccess = (
  data: any,
  error: number = 0,
  message: string = "Success"
) => {
  return { data: data, error: error, message: message };
};

export const ApiFailure = (
  error: Error | unknown | number,
  message: string = "Mereko kya maloom..."
) => {
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
