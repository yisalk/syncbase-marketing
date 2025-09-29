import axios from "axios";

export var apiRequests = async (ENDPOINT, METHOD, PAYLOAD, customHeaders = {}) => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const options = {
    url: `${baseUrl}/${ENDPOINT}`,
    method: METHOD,
    // headers: { "Content-Type": "multipart/form-data" },
    headers: { 
      "Content-Type": "application/json",
      ...customHeaders
    },
  };
  if(METHOD == "get") {
    options.params = PAYLOAD
  } else {
    options.data = PAYLOAD
  }

  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers['Authorization'] = token
      }
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  return axios(options);
}
