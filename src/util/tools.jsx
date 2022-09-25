import axios from "axios";
import { history } from "../index";

export const config = {
  setCookie: (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name);
    }
    return null;
  },
  setStore: (name, value) => {
    localStorage.setItem(name, value);
  },
  setStoreJson: (name, value) => {
    let json = JSON.stringify(value);
    localStorage.setItem(name, json);
  },
  getStoreJson: (name) => {
    if (localStorage.getItem(name)) {
      let result = localStorage.getItem(name);
      return JSON.parse(result);
    }
    return null;
  },
  ACCESS_TOKEN: "accessToken",
  USER_LOGIN: "userLogin",
  CART: "cart",
  ORDER_DETAIL: "orderDetail",
  // FACEBOOK_TOKEN: "facebookToken",
};

export const {
  setCookie,
  getCookie,
  getStore,
  setStore,
  setStoreJson,
  getStoreJson,
  ACCESS_TOKEN,
  FACEBOOK_TOKEN,
  USER_LOGIN,
  CART,
  ORDER_DETAIL,
} = config;

// Cấu hình request cho tất cả Api - response cho tất cả trả về:
// Cấu hình domain gửi đi:
const DOMAIN = "https://shop.cyberlearn.vn/api";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMCIsIkhldEhhblN0cmluZyI6IjE3LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NjU5MjAwMDAwMCIsIm5iZiI6MTY0ODIyNzYwMCwiZXhwIjoxNjc2NzM5NjAwfQ.aK-3RvHXQyu6H2-FFiafeSKR4UMCcRmnuDbTT-XIcUU";
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

// Cấu hình request header
http.interceptors.request.use(
  (config) => {
    const token = getStore(ACCESS_TOKEN);
    config.headers = {
      ...config.headers,
      ["Authorization"]: `Bearer ${token}`,
      ["TokenCybersoft"]: TOKEN_CYBERSOFT,
    };
    // console.log(config.headers);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (
      // error.response.status === 400 &&
      error.response.data.message === "Email đã được sử dụng!"
    ) {
      alert("Email đã được sử dụng vui lòng sử dụng email khác hoặc đăng nhập");
      history.push("/register");
      return Promise.reject(error);
    }
    if (error.response.status === 400 || error.response.status === 404) {
      history.push("/");
      return Promise.reject(error);
    }
    if (error.response.status === 401 || error.response.status === 403) {
      alert("Token không hợp lệ !Vui lòng đăng nhập lại!");
      history.push("/login");
      return Promise.reject(error);
    }
  }
);

/*
  Status Code
  400: Tham số gửi lên k hợp lệ => Kết quả không tìm được Bad Request
  404: Tham số gửi lên không hợp lệ nhưng không tìm thấy => Có thể bị xoá rồi (not found)
  200: Thành công OK
  201: Đã được tạo thành công => (Mình đã tạo rồi sau đó request tiếp thgif trả về 201)
  401: Không có quyền truy cập vào Api đó (Unauthorize - Có thể do token không hợp lệ hoặc bị admin chặn)
  403: Chưa đủ quyền truy cập vào api đó (Forbiden - token hợp lệ tuy nhiên k đủ quyền truy cập vào api)
  500: Lỗi xảy ra tại server (Nguyên nhân có thể do front end gửi dữ liệu không hợp lệ hoặc back end xử lý code gây ra lỗi hoặc do 
   backend code bị lỗi => error in server )
  */
