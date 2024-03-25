export const errorHandler = (statusCode, message) => {
  // create an error
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
