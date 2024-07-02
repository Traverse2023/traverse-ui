import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Modal from "../components/Modal";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useAuth} from "../hooks/useAuth.tsx";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons";
<<<<<<< HEAD
import Creator from "../components/Creator.tsx";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

=======
import {faGithub} from "@fortawesome/free-brands-svg-icons";
>>>>>>> 48105b3 (the social media icons have color now)

const Landing = () => {
    const [loginModal, setLoginModal] = React.useState(false);
    const [createModal, setCreateModal] = React.useState(false);
    const { login, register } = useAuth();
    const [bioModal, setBioModal] = useState(false);
    const [selectedCreator, setSelectedCreator] = useState(false)
    const [loginInfo, setLoginInfo] = React.useState({});
    const [registerInfo, setRegisterInfo] = React.useState({});

    const loginValidation = Yup.object().shape({
        email: Yup.string().required("Email address is required"),
        password: Yup.string().required("Password is required"),
    })

    const registerValidation = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().required("Email address is required"),
        password: Yup.string().required("Password is required"),
        // confirmPassword: Yup.string().required(),
    })

    // Update state when user types in login form
    const userInfoHandler = (event) => {
        setRegisterInfo((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            };
        });
    };

    const loginInfoHandler = (event) => {
        setLoginInfo((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            };
        });
    };

    // Handle registration. Perform input validation then call hook to register
    const registerHandler = async () => {
        registerValidation.validate(registerInfo).then(() =>
            register(loginInfo.firstName, loginInfo.lastName, loginInfo.email, loginInfo.password)
        ).catch(err => {
            console.log(`Error validating register ${err}`);
            toast.warn(err.message, {position: "top-center"});
        })
    };


    // Validate login inputs then call login hook
    const loginHandler = async () => {
        loginValidation.validate(loginInfo).then( () =>
            login(loginInfo.email, loginInfo.password)
        ).catch(err => {
            console.log(`Error validating login: ${err}`);
            toast.warn(err.message, {position: "top-center"});
        });
    };

    const iconMap = new Map([
            ["LinkedIn", <FontAwesomeIcon icon={faLinkedin} style={{height: "25px"}} />]
        ]
    )

    const members = [
       {
            firstName: "Isfar",
            lastName: "Oshir",
            socials: [
                {
                    socialMediaName: "LinkedIn",
                    link: "https://www.linkedin.com/in/isfar-oshir/"
                },
                {
                    socialMediaName: "Github",
                    link: "https://github.com/iao233"
                }
                ],

            quote: "Trying to do better.",
            bio: "I started Traverse back in my last semester of university at NYU. After setting up the foundation of the project, I reached out to some engineer friends I've made through out the past 4 years. It's been a blast working with the team, and we hope to make Traverse very robust. I am one of the leads in the project and do tasks from discussing components at a high level but then work on down to the very code itself.",
            pfp: "imgs/isfar.png",
            position: "Founder & Lead Engineer/Architect"
        },
        {
            firstName: "Bryan",
            lastName: "Palomo",
            socials: [
                {
                socialMediaName: "LinkedIn",
                link: "https://www.linkedin.com/in/bryan-palomo-059b80223/"
                },
                {
                    socialMediaName: "Github",
                    link: "https://github.com/briplomo1"
                }
            ],
            quote: "...",
            bio: "...",
            pfp: "imgs/bryan.png",
            position: "Founder & Lead Engineer/Architect"
        },
        {
            firstName: "Junming",
            lastName: "Qiu",
            socials: [
                {
                socialMediaName: "LinkedIn",
                link: "https://www.linkedin.com/in/junming-qiu-32b343191/"
                },
                {
                    socialMediaName: "Github",
                    link: "https://github.com/Junming-Qiu"
                }
                ],
            quote: "If it turns on I'll write code for it",
            bio: "I am a full stack engineer who loves to learn. From the industry standards to new emerging technology, I am able to dive deep in the technology while also keeping a high level view of how it will integrate with existing infrastructure.",
            pfp: "imgs/junming.png",
            position: "Lead Software Engineer"
        },
        {
            firstName: "Ahmed",
            lastName: "Rahi",
            socials: [
                {
                socialMediaName: "LinkedIn",
                link: "https://www.linkedin.com/in/ahmedrahi/"
                },
                {
                    socialMediaName: "Github",
                    link: "https://github.com/arahi7860"
                }
            ],
            quote: "Building digital bridges, one stack at a time.",
            bio: "As a full stack engineer, I thrive on building seamless digital experiences, from crafting elegant front-end interfaces to designing robust back-end systems.",
            pfp: "imgs/rahi.png",
            position: "Software Engineer"
        },
        {
            firstName: "Farhan",
            lastName: "Mashud",
            quote: "...",
            socials: [
                {
                socialMediaName: "LinkedIn",
                link: "https://www.linkedin.com/in/farhan-mashud/"
                },
                {
                    socialMediaName: "Github",
                    link: "https://github.com/fm1539"
                }
                ],
            bio: "HI Im",
            pfp: "imgs/farhan.png",
            position: "Product Manager & Scrum Master"
        }
    ]

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
                                     socials={[
                                         {
                                         socialMediaName: "LinkedIn",
                                         link: "https://www.linkedin.com/in/isfar-oshir/"
                                     },
                                         {
                                             socialMediaName: "Github",
                                             link: "https://github.com/iao233"
                                         }
                                     ]}
                            />
                        )
                    })
                    }
                    <Modal show={bioModal} setModalStatus={setBioModal} style={{ height: 'fit-content', width: '800px' }}>
                        <div style={{ display: "flex" }}>
                            <div>
                                <img src={selectedCreator?.pfp} style={{ width: "300px" }} />
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <div>
                                    <h1 style={{
                                        textAlign: "left",
                                        marginRight: "10px",
                                    }}>{selectedCreator.firstName} {selectedCreator.lastName}</h1>
                                    <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                                        {selectedCreator?.socials?.map(({ socialMediaName, link }) => (
                                            <div key={socialMediaName} style={{ marginRight: "10px" }}>
                                                {socialMediaName === "LinkedIn" && (
                                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                                        <FontAwesomeIcon icon={faLinkedin} style={{ height: "25px" }} />
                                                    </a>
                                                )}
                                                {socialMediaName === "Github" && (
                                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                                        <FontAwesomeIcon icon={faGithub} style={{ height: "25px" }} />
                                                    </a>
                                                )}
                                                {socialMediaName === "Twitter" && (
                                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                                        <FontAwesomeIcon icon={faTwitter} style={{ height: "25px" }} />
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <h4 style={{
                                    textAlign: "left",
                                    color: "#7F56D9",
                                    marginBottom: "5px"
                                }}>{selectedCreator.position}</h4>
                                <p style={{ textAlign: "left", marginTop: "0" }}>{selectedCreator.bio}</p>
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
                    <li className="menu__item"><a className="menu__link" href="#">Services</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">Team</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>

                </ul>
                <p>&copy;2024 Traverse | All Rights Reserved</p>
            </footer>

        </React.Fragment>
    );
};

export default Landing;
