import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Modal from "../components/Modal";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {login, register} from "../api/auth";
import {AuthContext} from "../context/auth-context";
import Creator from "../components/Creator.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons";

const Landing = () => {
    const notify = (msg) => toast.error(msg, {position: "top-center"})
    const registerToast = useRef(null)
    const loginToast = useRef(null)
    const [createModal, setCreateModal] = React.useState(false);

    const auth = React.useContext(AuthContext);

    const [userInfo, setUserInfo] = React.useState({});

    const userInfoHandler = (event) => {
        setUserInfo((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            };
        });
    };
    const [bioModal, setBioModal] = useState(false);
    const [selectedCreator, setSelectedCreator] = useState(false)

    const members = [
       {
            firstName: "Isfar",
            lastName: "Oshir",
            socials: [{
                    socialMediaName: "LinkedIn",
                    link: "https://www.linkedin.com/in/isfar-oshir/"
                }],
            quote: "Trying to do better.",
            bio: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n" +
                "\n" +
                "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
            pfp: "imgs/isfar.png",
            position: "Founder & Lead Engineer/Architect"
        },
        {
            firstName: "Bryan",
            lastName: "Palomo",
            socials: [{
                socialMediaName: "LinkedIn",
                link: "https://www.linkedin.com/in/bryan-palomo-059b80223/"
            }],
            quote: "Trying to do better.",
            bio: "HI Im",
            pfp: "imgs/bryan.png",
            position: "Founder & Lead Engineer/Architect"
        },
        {
            firstName: "Junming",
            lastName: "Qiu",
            socials: [{
                socialMediaName: "LinkedIn",
                link: "https://www.linkedin.com/in/junming-qiu-32b343191/"
            }],
            quote: "Trying to do better.",
            bio: "HI Im",
            pfp: "imgs/junming.png",
            position: "Lead Software Engineer"
        },
        {
            firstName: "Ahmed",
            lastName: "Rahi",
            socials: [{
                socialMediaName: "LinkedIn",
                link: "https://www.linkedin.com/in/ahmedrahi/"
            }],
            quote: "Trying to do better.",
            bio: "HI Im",
            pfp: "imgs/bryan.png",
            position: "Software Engineer"
        },
        {
            firstName: "Farhan",
            lastName: "Mashud",
            quote: "Trying to do better.",
            socials: [{
                socialMediaName: "LinkedIn",
                link: "https://www.linkedin.com/in/farhan-mashud/"
            }],
            bio: "HI Im",
            pfp: "imgs/farhan.png",
            position: "Scrum Master"
        }
    ]
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
                    console.log(value)
                    auth.acceptLogin(loginInfo.email, value.firstName, value.lastName, value.pfpURL,  value.token);
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

    const iconMap = new Map([
            ["LinkedIn", <FontAwesomeIcon icon={faLinkedin} style={{height: "25px"}} />]
        ]
    )

    return (
        <React.Fragment>
            <section className="welcome">
                <nav className="nav">
                    <div className="logo">
                        <h1>Traverse</h1>
                    </div>
                    <div className="typewriter2">
                        {/*<h1 id="typetext2">Compete. Collaborate. Code.</h1>*/}
                        <h1 id="typetext2">welcomeToCodeCentral()</h1>
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
                                    <span>Work to</span>{" "}
                                    <span style={{color: "#7F56D9"}}>
                                        Collaborate
                                    </span>
                                </div>
                                <div className="slogan-line">
                                    <span>Drive to</span>{" "}
                                    <span style={{color: "#7F56D9"}}>
                                        Compete
                                    </span>
                                </div>
                                <div className="slogan-line">
                                    <span>Improve your</span>{" "}
                                    <span style={{color: "#7F56D9"}}>
                                        Code!
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p>
                                    Provides you with the best collaborative and competitive multiplayer coding experience.
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
                <img
                    src="imgs/arrow.svg"
                    className="arrow"
                    onClick={() => (window.location = "/#team")}
                />
            </section>

            <section id="team" style={{paddingTop: "70px", textAlign: "center", height: "100%"}}>
                <h1>Meet the Team!</h1>
                <div style={{width: "1158px", margin: 'auto', display: "flex", justifyContent: "flex-start", gap: "20px", flexWrap: "wrap"}}>
                    {members.map(member => {
                        return (
                            <Creator setBioModal={setBioModal} creator={member} setSelectedCreator={setSelectedCreator}
                                     socials={[{
                                         socialMediaName: "LinkedIn",
                                         link: "https://www.linkedin.com/in/isfar-oshir/"
                                     }]}
                            />
                        )
                    })
                    }
                    <Modal show={bioModal} setModalStatus={setBioModal} style={{height: 'fit-content', width: '800px'}}>
                        <div style={{display: "flex"}}>
                            <div>
                                <img src={selectedCreator?.pfp} style={{width: "300px"}}/>
                                <br/><br/>
                                <div style={{display: "flex"}}>
                                    {selectedCreator?.socials?.map(({socialMediaName, link}) => <Link to={link} target="_blank" style={{position: 'relative', zIndex: "10"}}>{iconMap.get(socialMediaName)}</Link>)}
                                </div>
                            </div>
                            <div>
                                <h1 style={{textAlign: "left"}}>{selectedCreator.firstName} {selectedCreator.lastName}</h1>
                                <h4 style={{textAlign: "left", color: "#7F56D9"}}>{selectedCreator.position}</h4>
                                <p style={{textAlign: "left"}}>
                                    {selectedCreator.bio}
                                </p>
                            </div>
                        </div>
                    </Modal>
                </div>
            </section>





            <footer className="footer">
                <div className="waves">
                    <div className="wave" id="wave1"></div>
                    <div className="wave" id="wave2"></div>
                    <div className="wave" id="wave3"></div>
                    <div className="wave" id="wave4"></div>
                </div>
                <ul className="social-icon">
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-facebook"></ion-icon>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-twitter"></ion-icon>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-linkedin"></ion-icon>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </a></li>
                </ul>
                <ul className="menu">
                    <li className="menu__item"><a className="menu__link" href="#">Home</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">About</a></li>
                    <li class="menu__item"><a class="menu__link" href="#">Services</a></li>
                    <li class="menu__item"><a class="menu__link" href="#">Team</a></li>
                    <li class="menu__item"><a class="menu__link" href="#">Contact</a></li>

                </ul>
                <p>&copy;2024 Traverse | All Rights Reserved</p>
            </footer>

        </React.Fragment>
    );
};

export default Landing;
