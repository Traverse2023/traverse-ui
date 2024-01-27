import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";

const Landing = () => {

    const [loginModal, setLoginModal] = React.useState(false);
    const [createModal, setCreateModal] = React.useState(false);

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
                            <ToastContainer />
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
                            <LoginForm
                                loginModal={loginModal}
                                setLoginModal={setLoginModal}
                                setCreateModal={setCreateModal}
                            />
                            <button
                                className="btn"
                                onClick={() => {
                                    setCreateModal(true);
                                }}
                            >
                                Create Account
                            </button>
                            <RegisterForm
                                createModal={createModal}
                                setCreateModal={setCreateModal}
                                setLoginModal={setLoginModal}
                            />
                        </div>
                    </div>
                </nav>
                <div className="middleSec">
                    <div className="slogan">
                        <div className="sloganContainer">
                            <div>
                                <div className="slogan-line">
                                    <span>Invite</span>{" "}
                                    <span style={{ color: "#7F56D9" }}>
                                        Friends
                                    </span>
                                </div>
                                <div className="slogan-line">
                                    <span>Create</span>{" "}
                                    <span style={{ color: "#7F56D9" }}>
                                        Itineraries
                                    </span>
                                </div>
                                <div className="slogan-line">
                                    <span>Go</span>{" "}
                                    <span style={{ color: "#7F56D9" }}>
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
                            <h2 style={{ width: "50%" }}>2K+</h2>
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
                        <img src="imgs/user.png" />
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
                        style={{ width: "130px" }}
                    />
                    <img
                        className="amzn"
                        src="imgs/amzn.png"
                        style={{ height: "60px", marginTop: "20px" }}
                    />
                    <img
                        className="apple"
                        src="imgs/apple.png"
                        style={{ height: "105px" }}
                    />
                    <img
                        className="microsoft"
                        src="imgs/microsoft.png"
                        style={{ height: "90px", width: "250px" }}
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
