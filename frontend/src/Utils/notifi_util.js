const notifiy = {
  Sucsses: msg => {
    return {
      type: "Sucsses",
      body: msg
    };
  },
  Fail: msg => {
    return {
      type: "Fail",
      body: msg
    };
  },
  Warning: msg => {
    return {
      type: "Warning",
      body: msg
    };
  },
  Info: msg => {
    return {
      type: "Info",
      body: msg
    };
  }
};

export default notifiy;
