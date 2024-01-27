import React, { useRef } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { register } from "../../api/auth";
import Modal from "../Modal";

const RegisterForm = ({ createModal, setCreateModal, setLoginModal }) => {
    const notify = (msg) => toast.error(msg, { position: "top-center" })
    const registerToast = useRef(null)

    const [userInfo, setUserInfo] = React.useState({});

    const userInfoHandler = (event) => {
        setUserInfo((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            };
        });
    };

    const registerHandler = () => {
        if ("email" in userInfo && "firstName" in userInfo && "lastName" in userInfo && "password" in userInfo) {
            registerToast.current = toast.loading("Creating Account...")
            register(
                userInfo.email,
                userInfo.password,
                userInfo.firstName,
                userInfo.lastName
            )
                .then((value) => {
                    setCreateModal(false)
                    toast.update(registerToast.current, {
                        position: "top-right",
                        type: "success",
                        isLoading: false,
                        render: "Account Created!",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        closeButton: true
                    })
                    // toast.success("Account Created!")
                })
                .catch((err) => {
                    toast.update(registerToast.current, {
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
                    // notify(err.response.data.msg)
                    console.log(err);
                });
        } else {
            notify("Please fill out all fields")
        }
    };

    return (
        <Modal
            show={createModal}
            setModalStatus={setCreateModal}
        >
            <h1 style={{
                textAlign: "center",
                color: "rgb(127, 86, 217)",
                fontWeight: "bolder"
            }}>Register</h1>
            <br />
            <div className="icon-input-container">
                <div className="edge"></div>
                <i className="fa-solid fa-user" style={{ color: "rgb(127, 86, 217)" }}></i>
                <input
                    id="firstName"
                    className="auth-input"
                    placeholder="First Name"
                    onChange={userInfoHandler}
                />
                <div className="edge"></div>
            </div>
            <br />

            <div className="icon-input-container">
                <div className="edge"></div>
                <i className="fa-solid fa-user" style={{ color: "rgb(127, 86, 217)" }}></i>
                <input
                    id="lastName"
                    className="auth-input"
                    placeholder="Last Name"
                    onChange={userInfoHandler}
                />
                <div className="edge"></div>
            </div>
            <br />

            <div className="icon-input-container">
                <div className="edge"></div>
                <i className="fa-solid fa-envelope" style={{ color: "rgb(127, 86, 217)" }}></i>
                <input
                    id="email"
                    className="auth-input"
                    placeholder="Email"
                    onChange={userInfoHandler}
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
                    onChange={userInfoHandler}
                />
                <div className="edge"></div>
            </div>
            <br />
            <button onClick={registerHandler} className="auth-btn">
                Register
            </button>
            <br /><br />
            <p style={{ fontSize: "12px", textAlign: "center" }}>Already have an account? <span
                style={{ color: "rgb(127, 86, 217)", cursor: "pointer" }} onClick={() => {
                    setCreateModal(false)
                    setLoginModal(true)
                }}>Log in.</span></p>
        </Modal>
    );
};

export default RegisterForm;