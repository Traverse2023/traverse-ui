import React, {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import Modal from "../components/Modal";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {login, register} from "../api/auth";
import {AuthContext} from "../context/auth-context";
import {useAuth} from "../hooks/useAuth.js";

const Landing = () => {
    const notify = (msg) => toast.error(msg, {position: "top-center"})
    const registerToast = useRef(null)
    const loginToast = useRef(null)
    const [createModal, setCreateModal] = React.useState(false);
    const { login, register } = useAuth();

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
            register()
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

    const [loginModal, setLoginModal] = React.useState(false);
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
        <React.Fragment>
            <section className="welcome">
                <nav className="nav">
                    <div className="logo">
                        <h1>Traverse</h1>
                    </div>
                    <div className="typewriter2">
                        <h1 id="typetext2">Planning made simple.</h1>
                    </div>
                    <div className="right-side">
                        <div className="middleOpt">
                            <Link to={"#"}>About</Link>
                            <Link to={"#"}>Features</Link>
                            <Link to={"#"}>Partners</Link>
                            <ToastContainer/>
                        </div>
                        <div className="authOpt">
                            <button
                                className="minimalBtn"
                                onClick={() => {
                                    setLoginModal(true);
                                }}
                            >
                                Sign In
                            </button>
                            <Modal
                                show={loginModal}
                                setModalStatus={setLoginModal}
                            >
                                <h1 style={{
                                    textAlign: "center",
                                    color: "rgb(127, 86, 217)",
                                    fontWeight: "bolder"
                                }}>Login</h1>
                                <br/>
                                <div className="icon-input-container">
                                    <div className="edge"></div>
                                    <i className="fa-solid fa-user" style={{color: "rgb(127, 86, 217)"}}></i>
                                    <input
                                        id="email"
                                        className="auth-input"
                                        placeholder="Email"
                                        onChange={loginInfoHandler}
                                    />
                                    <div className="edge"></div>
                                </div>
                                <br/>
                                <div className="icon-input-container">
                                    <div className="edge"></div>
                                    <i className="fa-solid fa-lock" style={{color: "rgb(127, 86, 217)"}}></i>
                                    <input
                                        id="password"
                                        className="auth-input"
                                        placeholder="Password"
                                        onChange={loginInfoHandler}
                                    />
                                    <div className="edge"></div>
                                </div>
                                <br/>
                                <button className="auth-btn" onClick={loginHandler}>Login</button>
                                <br/><br/>
                                <p style={{fontSize: "12px", textAlign: "center"}}>Dont' have an account? <span
                                    style={{color: "rgb(127, 86, 217)", cursor: "pointer"}} onClick={() => {
                                    setLoginModal(false)
                                    setCreateModal(true)
                                }}>Create Account.</span></p>
                            </Modal>
                            <button
                                className="btn"
                                onClick={() => {
                                    setCreateModal(true);
                                }}
                            >
                                Create Account
                            </button>
                            <Modal
                                show={createModal}
                                setModalStatus={setCreateModal}
                            >
                                <h1 style={{
                                    textAlign: "center",
                                    color: "rgb(127, 86, 217)",
                                    fontWeight: "bolder"
                                }}>Register</h1>
                                <br/>
                                <div className="icon-input-container">
                                    <div className="edge"></div>
                                    <i className="fa-solid fa-user" style={{color: "rgb(127, 86, 217)"}}></i>
                                    <input
                                        id="firstName"
                                        className="auth-input"
                                        placeholder="First Name"
                                        onChange={userInfoHandler}
                                    />
                                    <div className="edge"></div>
                                </div>
                                <br/>

                                <div className="icon-input-container">
                                    <div className="edge"></div>
                                    <i className="fa-solid fa-user" style={{color: "rgb(127, 86, 217)"}}></i>
                                    <input
                                        id="lastName"
                                        className="auth-input"
                                        placeholder="Last Name"
                                        onChange={userInfoHandler}
                                    />
                                    <div className="edge"></div>
                                </div>
                                <br/>

                                <div className="icon-input-container">
                                    <div className="edge"></div>
                                    <i className="fa-solid fa-envelope" style={{color: "rgb(127, 86, 217)"}}></i>
                                    <input
                                        id="email"
                                        className="auth-input"
                                        placeholder="Email"
                                        onChange={userInfoHandler}
                                    />
                                    <div className="edge"></div>
                                </div>
                                <br/>
                                <div className="icon-input-container">
                                    <div className="edge"></div>
                                    <i className="fa-solid fa-lock" style={{color: "rgb(127, 86, 217)"}}></i>
                                    <input
                                        id="password"
                                        className="auth-input"
                                        placeholder="Password"
                                        onChange={userInfoHandler}
                                    />
                                    <div className="edge"></div>
                                </div>
                                <br/>
                                <button onClick={registerHandler} className="auth-btn">
                                    Register
                                </button>
                                <br/><br/>
                                <p style={{fontSize: "12px", textAlign: "center"}}>Already have an account? <span
                                    style={{color: "rgb(127, 86, 217)", cursor: "pointer"}} onClick={() => {
                                    setCreateModal(false)
                                    setLoginModal(true)
                                }}>Log in.</span></p>
                            </Modal>
                        </div>
                    </div>
                </nav>
                <div className="middleSec">
                    <div className="slogan">
                        <div className="sloganContainer">
                            <div>
                                <div className="slogan-line">
                                    <span>Invite</span>{" "}
                                    <span style={{color: "#7F56D9"}}>
                                        Friends
                                    </span>
                                </div>
                                <div className="slogan-line">
                                    <span>Create</span>{" "}
                                    <span style={{color: "#7F56D9"}}>
                                        Itineraries
                                    </span>
                                </div>
                                <div className="slogan-line">
                                    <span>Go</span>{" "}
                                    <span style={{color: "#7F56D9"}}>
                                        Travel!
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p>
                                    Provides you with the latest online learning
                                    system and material that help your knowledge
                                    growing.
                                </p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="sampleUser">
                        <div className="botLeftBubble">
                            <h2 style={{width: "50%"}}>2K+</h2>
                            <p
                                style={{
                                    bottom: "10px",
                                    fontWeight: "400",
                                    fontSize: "15px",
                                    lineHeight: "18.15px",
                                    color: "#101828",
                                    opacity: "0.5",
                                }}
                            >
                                Users completely online
                            </p>
                        </div>
                        {/* <div className='upperRightBubble'>
                        Hey
                    </div>
                    <div className='botRightBubble'>
                        Hey
                    </div> */}
                        <img src="imgs/user.png"/>
                    </div>
                </div>
                <div className="supported">
                    <div className="supporters">
                        <h1>10+</h1>
                        <p>Partners</p>
                    </div>
                    <img
                        className="google"
                        src="imgs/google.png"
                        style={{width: "130px"}}
                    />
                    <img
                        className="amzn"
                        src="imgs/amzn.png"
                        style={{height: "60px", marginTop: "20px"}}
                    />
                    <img
                        className="apple"
                        src="imgs/apple.png"
                        style={{height: "105px"}}
                    />
                    <img
                        className="microsoft"
                        src="imgs/microsoft.png"
                        style={{height: "90px", width: "250px"}}
                    />
                </div>
            </section>
            <img
                src="imgs/arrow.svg"
                className="arrow"
                onClick={() => (window.location = "/#next")}
            />
            {/* <h1>hey</h1> */}
        </React.Fragment>
    );
};

export default Landing;
