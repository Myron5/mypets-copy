const { default: prepareFormData } = require("./prepareFormData");
const { default: transformFormData } = require("./transformFormData")

const makeformData = (values) => {
    const transformedValues = transformFormData(values);
    const newValues = prepareFormData(transformedValues);
    
    const formData = new FormData();
    for (let value in newValues) {
      formData.append(value, newValues[value]);
    }

    // for (let property of formData.entries()) {
    //   console.log(property[0], property[1]);
    // }
    return formData;
}

export default makeformData;