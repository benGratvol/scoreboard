class Validate {
  notEmpty = inputArr => {
    const keyArray = Object.keys(inputArr);
    let Errinput = {
      err: false,
      errMessage: ""
    };
    try {
      for (let i = 0; i < keyArray.length; i++) {
        if (inputArr[keyArray[i]] === "") {
          Errinput.err = true;
          Errinput.errMessage = `Woops... you forgot : ${keyArray[i]}`;
          break;
        } else {
          Errinput.err = false;
        }
      }
    } catch (err) {}

    return Errinput;
  };
}

export default new Validate();
