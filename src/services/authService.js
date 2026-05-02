import axios from "axios";

const API_URL = "https://take-home-test-api.nutech-integrasi.app/";

const register = (data) => {
  return axios.post(API_URL + "registration", data);
};

const login = (data) => {
  return axios.post(API_URL + "login", data).then((response) => {
    if (response.data.data.token) {
      sessionStorage.setItem("userToken", response.data.data.token);
    }
    return response.data;
  });
};

const profile = (userToken) => {
  const headers = { Authorization: `Bearer ${userToken}` };
  return axios
    .get(API_URL + "profile", { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};

const editFotoProfile = async (userToken, data) => {
  const headers = { Authorization: `Bearer ${userToken}` };
  return await axios
    .put(API_URL + "profile/image", data, { headers })
    .then((response) => {
      return { status: "success", response: response.data };
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};

const editProfile = async (userToken, data) => {
  const headers = { Authorization: `Bearer ${userToken}` };
  return await axios
    .put(API_URL + "profile/update", data, { headers })
    .then((response) => {
      return { status: "success", response: response.data };
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};

const service = (userToken) => {
  const headers = { Authorization: `Bearer ${userToken}` };
  return axios.get(API_URL + "services", { headers }).then((response) => {
    return response.data;
  });
};

const banner = (userToken) => {
  const headers = { Authorization: `Bearer ${userToken}` };
  return axios.get(API_URL + "banner", { headers }).then((response) => {
    return response.data;
  });
};

const balance = (userToken) => {
  const headers = { Authorization: `Bearer ${userToken}` };
  return axios.get(API_URL + "balance", { headers }).then((response) => {
    return response.data;
  });
};

const topup = async (userToken, nominal) => {
  const headers = { Authorization: `Bearer ${userToken}` };
  return await axios
    .post(API_URL + "topup", { top_up_amount: nominal }, { headers })
    .then((response) => {
      return { status: "success", response: response.data };
    })
    .catch((error) => {
      return { status: "failed", response: error.response };
    });
};

const payment = async (userToken, code) => {
  const headers = { Authorization: `Bearer ${userToken}` };
  return await axios
    .post(API_URL + "transaction", { service_code: code }, { headers })
    .then((response) => {
      return { status: "success", response: response.data };
    })
    .catch((error) => {
      return { status: "failed", response: error.response.data };
    });
};

const transactionHistory = (data) => {
  const headers = { Authorization: `Bearer ${data.userToken}` };
  return axios
    .get(
      API_URL + `transaction/history?offset=${data.offset}&limit=${data.limit}`,
      { headers }
    )
    .then((response) => {
      return { status: "success", response: response.data };
    })
    .catch((error) => {
      return { status: "failed", response: error.response };
    });
};

const logout = () => {
  sessionStorage.removeItem("userToken");
};
const authService = {
  register,
  login,
  profile,
  editFotoProfile,
  editProfile,
  service,
  banner,
  balance,
  topup,
  payment,
  transactionHistory,
  logout,
};

export default authService;
