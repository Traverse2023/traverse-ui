import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { login } from "../../api/auth";
import { AuthContext } from "../../context/auth-context";
import Modal from "../Modal";

const LoginForm = ({ loginModal, setLoginModal, setCreateModal }) => {
    const notify = (msg) => toast.error(msg, { position: "top-center" })
    const loginToast = useRef(null)

    const auth = React.useContext(AuthContext);

    const [loginInfo, setLoginInfo] = React.useState({});

    const loginInfoHandler = (event) => {
        setLoginInfo((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            };
        });
    };

    const loginHandler = () => {
        if ("email" in loginInfo && "password" in loginInfo) {
            loginToast.current = toast.loading("Logging In...")
            login(loginInfo.email, loginInfo.password)
                .then((value) => {
                    console.log(value)
                    auth.acceptLogin(loginInfo.email, value.firstName, value.lastName, value.pfpURL, value.token);
                    toast.update(loginToast.current, {
                        position: "top-right",
                        type: "success",
                        isLoading: false,
                        render: "Logged In!",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        closeButton: true
                    })
                })
                .catch((err) => {
                    console.log(err);
                    toast.update(loginToast.current, {
                        position: "top-center",
                        type: "error",
                        isLoading: false,
                        render: err.response.data.msg,
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        closeButton: true
                    })
                });
        } else {
            notify("Please fill out all fields.")
        }
    };
    return (
        <Modal
            show={loginModal}
            setModalStatus={setLoginModal}
        >
            <h1 style={{
                textAlign: "center",
                color: "rgb(127, 86, 217)",
                fontWeight: "bolder"
            }}>Login</h1>
            <br />
            <div className="icon-input-container">
                <div className="edge"></div>
                <i className="fa-solid fa-user" style={{ color: "rgb(127, 86, 217)" }}></i>
                <input
                    id="email"
                    className="auth-input"
                    placeholder="Email"
                    onChange={loginInfoHandler}
                />
                <div className="edge"></div>
            </div>
            <br />
            <div className="icon-input-container">
                <div className="edge"></div>
                <i className="fa-solid fa-lock" style={{ color: "rgb(127, 86, 217)" }}></i>
                <input
                    id="password"
                    className="auth-input"
                    placeholder="Password"
                    onChange={loginInfoHandler}
                />
                <div className="edge"></div>
            </div>
            <br />
            <button className="auth-btn" onClick={loginHandler}>Login</button>
            <br /><br />
            <p style={{ fontSize: "12px", textAlign: "center" }}>Dont' have an account? <span
                style={{ color: "rgb(127, 86, 217)", cursor: "pointer" }} onClick={() => {
                    setLoginModal(false)
                    setCreateModal(true)
                }}>Create Account.</span></p>
        </Modal>
    );
};

export default LoginForm;