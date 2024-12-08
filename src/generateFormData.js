export const generateFormData = (obj) => {
  const formdata = new FormData();
  const array = Object.keys(obj).map((key) => {
    formdata.append(key, obj[key]);
  });
  return formdata;
};
