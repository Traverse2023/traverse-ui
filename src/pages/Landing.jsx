import React, {useEffect, useRef, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useAuth} from "../hooks/useAuth.tsx";
import * as Yup from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import { motion, useInView } from 'framer-motion';
import FAQ from "../components/Question";




const Landing = () => {
    const [loginModal, setLoginModal] = React.useState(false);
    const [createModal, setCreateModal] = React.useState(false);
    const { login, register } = useAuth();
    const [bioModal, setBioModal] = useState(false);
    const [selectedCreator, setSelectedCreator] = useState(false)
    const [loginInfo, setLoginInfo] = React.useState({});
    const [registerInfo, setRegisterInfo] = React.useState({});
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

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
            quote: "Hi",
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


    const iconMap = new Map([
            ["LinkedIn", <FontAwesomeIcon icon={faLinkedin} style={{height: "25px"}} />],
            ["GitHub", <FontAwesomeIcon icon={faGithub} style={{height: "25px"}} />]
        ]
    )


    return (
       <div>
        {/* Navbar */}

        <div className="fixed w-full h-24 bg-white flex justify-center items-center opacity-90 z-50">
            <motion.div 
                className="absolute left-20"
                variants={{
                    hidden: { rotate: 0 },
                    visible: { rotate: 360 }
                    }}
                    initial= "hidden"
                    animate= "visible"
                    transition={{duration: 3, delay: 0.25}}
                >
                    <img className="scale-105" src="/public/imgs/logo.svg"/>
                </motion.div>
            <div className="w-1/3 text-md flex justify-around rounded-3xl">
                <div>Features</div>
                <div>Team</div>
                <div>FAQ</div>
                <div>Contact</div>
            </div>
            <div className="absolute right-20"><button className="px-6 py-2 bg-honey rounded-xl">Login</button></div>
        </div>

        {/* Hero Section */}
        <div className="h-screen pt-36 text-black flex flex-col justify-center items-center">
            <div className="text-black text-7xl font-bold flex flex-col items-center">
                <motion.h1 
                className="mt-6"
                variants={{
                    hidden: {opacity: 0, y:-50},
                    visible: {opacity: 100, y:0}
                }}
                initial= "hidden"
                animate= "visible"
                transition={{duration: 1, delay: 0.25}}
                >
                    Hive to <span className="text-honey">Collaborate.</span>

                </motion.h1>


                <motion.h1 
                className="mt-6"
                variants={{
                    hidden: {opacity: 0, y:-50},
                    visible: {opacity: 100, y:0}
                }}
                initial= "hidden"
                animate= "visible"
                transition={{duration: 1, delay: 1}}
                >
                    Buzz to <span className="text-honey">Compete.</span>

                </motion.h1>


                <motion.h1 
                className="mt-6"
                variants={{
                    hidden: {opacity: 0, y:-50},
                    visible: {opacity: 100, y:0}
                }}
                initial= "hidden"
                animate= "visible"
                transition={{duration: 1, delay: 1.75}}
                >
                    Sweeten your <span className="text-honey">Code.</span>

                </motion.h1>
            </div>

            <motion.div 
            className="mt-20 text-2xl text-gray-500 text-center font-thin"
            variants={{
                hidden: {opacity: 0},
                visible: {opacity: 100}
            }}
            initial= "hidden"
            animate= "visible"
            transition={{duration: 1.5, delay: 2.75}}
            >


                <h3>Work with friends or battle against rivals to sharpen </h3>
                <h3>your programming skills.</h3>
            </motion.div>

            <motion.div 
            className="w-1/4 mt-20 flex justify-evenly "
            variants={{
                hidden: {opacity: 0},
                visible: {opacity: 100}
            }}
            initial= "hidden"
            animate= "visible"
            transition={{duration: 1.5, delay: 2.75}}
            >
                <button className="w-40 py-3 bg-honey text-xl rounded-xl cursor-not-allowed">Get Started</button>
                <button className="w-40 py-3 ml-12 bg-coal text-white text-xl rounded-xl cursor-pointer">FAQ</button>
            </motion.div>
        </div>

        {/* Features Section */}
        <div>

            {/* Hive Mentality */}
            <motion.div
                ref={ref}
                className="h-screen text-7xl flex flex-col justify-center items-center"
                initial={{ opacity: 0, scale: 2 }} // Start hidden and slightly offscreen
                animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 2 : 50 }} // Animate to visible
                transition={{ duration: 2, ease: 'easeOut' }} // Customize the timing
                >
                <h1>
                    Give <span className="text-honey">hive-mentality</span>
                </h1>
                <h1 className="mt-4">
                    a new <span className="text-honey">meaning</span>.
                </h1>
            </motion.div>

            {/* Collaborate Section */}
            <div className="h-screen py-36">
                <div className="w-full h-1/3 flex justify-center">
                    <div className="w-3/4 h-1/3 text-7xl flex">
                        <div>
                            <h1 className="">Work <span className="text-honey">together</span> to <span className="text-honey">solve</span></h1>
                            <h1 className="ml-96">complex <span className="text-honey">problems</span>.</h1>
                        </div>

                    </div>
                </div>
                

                <div className="w-full h-5/6 flex justify-center items-center ">
                <div className="w-5/12 h-5/6">
                    <div className="w-full h-full bg-black text-white rounded-xl flex justify-center items-center">
                        functionality to be added
                    </div>
                    <div className="w-full h-12  flex items-center justify-center">
                        <div className="w-1/3 flex justify-evenly">
                            <div className="w-3 h-3  bg-slate-300 rounded-xl"></div>
                            <div className="w-12 h-3 bg-slate-300  rounded-xl"></div>
                            <div className="w-3 h-3  bg-slate-300 rounded-xl"></div>
                            <div className="w-3 h-3  bg-slate-300 rounded-xl"></div>
                                </div>                
                    </div>
                </div>
                     

                    <div className="m-24">
                        <h4>Caption for wtv is in carousel</h4>
                    </div>
                </div>
                

               
            </div>

            {/* Compete Section */}
            <div className="h-screen py-36">
                <div className="w-full h-1/3 text-7xl flex justify-center">
                    <div className="flex flex-col items-center">
                        <h1 className="">Or <span className="text-honey">compete</span> against</h1>
                        <h1 className="">other <span className="text-honey">programmers</span>.</h1>
                    </div>
                </div>

                <div className="w-full h-1/3 mt-36 flex justify-center items-center">
                    <div className="flex items-center">
                        <div className=""><img className="scale-80" src="/public/imgs/roundHexagon.svg"/></div>
                        <h2 className="text-6xl mx-24 ">vs.</h2>
                        <div className=""><img className="scale-80" src="/public/imgs/roundHexagon.svg"/></div>
                    </div>
                </div>
            </div>

            {/* Code Section */}
            <div className="h-screen py-36">
                <div className="text-7xl ml-24">
                    <h1><span className="text-honey">Reinvent</span> your <span className="text-honey">code</span></h1>
                    <h1>like <span className="text-honey">never</span> before.</h1>
                </div>

                <div className="w-full px-24 mt-20 flex justify-between items-between">
                    <div>
                        <div className="w-full">
                            <h4>Lorem ipsum blah blah blah blah blah. Yap yappatron yippee lorem ipsum...</h4>
                        </div>

                        <div className="mt-24 text-3xl flex flex-col">
                            <code> if (usedCodeHive) {`{`}</code>
                            <code className="ml-8"> becomeBetter();</code>
                            <code> {`}`}</code>
                        </div>
                    </div>
                    
                    <div className="w-1/2 py-52 ml-72 bg-black text-white rounded-xl flex justify-center items-center"> 
                        Graph
                    </div>
                </div>
                
            </div>

        </div>

        {/* Team Section */}
        <div className="h-screen py-36">
            <div className="flex justify-center text-6xl">
                <h1>Meet the <span className="text-honey">bees</span>.</h1>
            </div>

            <div className="flex justify-center items-center h-3/4">
                Need to create hexagonal profile components.
            </div>
        </div>

        {/* FAQ Section */}
        <div className="h-screen py-36 mx-32 flex justify-evenly">
            <div className="w-1/3 h-full">
                <div className="text-5xl leading-normal">
                    <h1><span className="text-6xl text-honey">F</span>requently</h1>
                    <h1><span className="text-6xl text-honey">A</span>sked</h1>
                    <h1><span className="text-6xl text-honey">Q</span>uestions</h1>
                </div>

                <div className="w-5/6 h-10 mt-12 border-2 border-honey rounded-2xl flex items-center justify-evenly">
                    <div className="text-slate-400">Bzz bzz... bzzzz bzz bzzz?</div>
                    <div><img className="scale-[0.65]" src="/public/imgs/Search.svg"/></div>
                </div>
            </div>
            
            <div className="w-2/3 h-full ml-24 flex flex-col justify-between">
                <FAQ/>
            </div>
        </div>


        <footer className="h-64 bg-honey flex flex-col justify-evenly items-center">
                
                <ul className="w-1/6 flex justify-between">
                    <li className=""><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
                    <li className=""><a href="#"><ion-icon name="logo-twitter"></ion-icon></a></li>
                    <li className=""><a href="#"><ion-icon name="logo-linkedin"></ion-icon></a></li>
                    <li className=""><a href="#"><ion-icon name="logo-instagram"></ion-icon></a></li>
                </ul>
                <ul className="w-1/3 flex justify-between">
                    <li className=""><a href="#">Home</a></li>
                    <li className=""><a href="#">About</a></li>
                    <li className=""><a href="#">Services</a></li>
                    <li className=""><a href="#">Team</a></li>
                    <li className=""><a href="#">Contact</a></li>
                </ul>
                <p>&copy;2024 CodeHive | All Rights Reserved</p>
        </footer>

       </div>
    );
};

export default Landing;
