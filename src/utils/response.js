export const jsonTrue = (data) => {
  return { success: true, data }
}
export const jsonFalse = (msg) => {
  return { success: false, message: msg }
}

export const sendResponse = (res, success, message, data = null, error = null) => {
  return res.json({
      success: success,
      message: message,
      data: data,
      error: error
  });
};
