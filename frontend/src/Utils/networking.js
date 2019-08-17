class networking {
  useFetch = async url => {
    const fet = await fetch(url);
    const jsObj = await fet.json();
    return jsObj;
  };

  useFetchPut = async (url, token, data) => {
    const fet = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(data)
    });
    const jsObj = await fet.json();
    return jsObj;
  };

  useFetchPost = async (url, token, data) => {
    const fet = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(data)
    });
    const jsObj = await fet.json();
    return jsObj;
  };

  useFetchDelete = async (url, token, data) => {
    const fet = await fetch(url, {
      method: "DELETE ",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: token
      },
      body: JSON.stringify(data)
    });
    const jsObj = await fet.json();
    return jsObj;
  };
}

export default new networking();
