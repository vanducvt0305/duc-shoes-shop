import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Carts from "./pages/Carts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import {createBrowserHistory} from 'history';
import LoginFaceBook from "./components/LoginFaceBook";

export const history = createBrowserHistory({ window });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Header />
      <Menu />
      <Routes>
        <Route path="" element={<App />}></Route>
        <Route index element={<Index />}></Route>
        <Route path="*" element={<Navigate to="" />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/detail" element={<Detail />}>
          <Route path=":id" element={<Detail />}></Route>
        </Route>
        <Route path="/carts" element={<Carts />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/loginfacebook" element={<LoginFaceBook />}></Route>
      </Routes>
      <Footer />
    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
