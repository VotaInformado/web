/* eslint-disable camelcase */
/* eslint-disable no-return-await */
// eslint-disable-next-line no-undef
let apiUri = process.env.REACT_APP_API_URI;
console.log(apiUri);

// DATA FUNCTIONS
const getToken = () => localStorage.getItem("token");

const contentAuthData = (type, body) => {
  const token = getToken();
  const requestData = {
    method: type,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  if (body) requestData.body = JSON.stringify(body);
  return requestData;
};

async function getResponseData(response, data) {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return data;
  }
  return Promise.reject(data);
}

async function dbGet(category) {
  const requestData = {}; // getAuthData("GET");
  if (category?.charAt(0) === "/") category = category.slice(1);
  const response = await fetch(`${apiUri}/${category}`, requestData);
  const data = await response.json();

  return await getResponseData(response, data);
}

async function dbPut(category, putData) {
  const requestData = contentAuthData("PUT", putData);
  if (category?.charAt(0) === "/") category = category.slice(1);
  const response = await fetch(`${apiUri}/${category}`, requestData);
  const data = await response.json();

  return await getResponseData(response, data);
}

async function dbPost(category, postData) {
  const requestData = contentAuthData("POST", postData);
  if (category?.charAt(0) === "/") category = category.slice(1);
  const response = await fetch(`${apiUri}/${category}`, requestData);
  const data = await response.json();

  return await getResponseData(response, data);
}

async function dbDelete(category, deleteData) {
  const requestData = contentAuthData("DELETE", deleteData);
  const response = await fetch(`${apiUri}/${category}`, requestData);
  const data = await response.json();

  return await getResponseData(response, data);
}

// async function Login(userData) {
//   const encodedData = Buffer.from(`${userData.username}:${userData.password}`).toString('base64');
//   const requestData = {
//     method: 'POST',
//     headers: { Authorization: `Basic ${encodedData}` },
//   };
//   const response = await fetch(`${apiUri}/auth/login`, requestData);
//   const data = await response.json();

//   return await getResponseData(response, data);
// }

// async function Reset(userData) {
//   const currentURL = `${window.location.protocol}//${window.location.host}`;
//   const encodedData = Buffer.from(`${userData.email}:${userData.user}`).toString('base64');
//   const requestData = {
//     method: 'GET',
//     headers: {
//       Authorization: `Basic ${encodedData}`,
//       'Content-Type': currentURL,
//     },
//   };
//   const response = await fetch(`${apiUri}/auth/password-reset`, requestData);
//   const data = await response.json();

//   return await getResponseData(response, data);
// }

export { dbGet, dbPut, dbDelete, dbPost };
