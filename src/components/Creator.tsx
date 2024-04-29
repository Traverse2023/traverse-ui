import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";
import Modal from "../components/Modal";
import {useState} from "react";

type Social = {
    link: string
    socialMediaName: string
}
type Creator = {
    firstName: string
    lastName: string
    position: string
    bio: string
    quote: string
    pfp: string
    socials: Social[]
}
const iconMap = new Map([
        ["LinkedIn", <FontAwesomeIcon icon={faLinkedin} style={{height: "25px"}} />]
    ]
)




const Creator = ({ setBioModal, creator, setSelectedCreator}: {setBioModal: any, creator: Creator, setSelectedCreator: any}) => {


    return (
        <div className="bio-card" style={{backgroundColor: "white", padding: "20px 10px 20px 10px", borderRadius: "10px"}}>
            <div onClick={() => {
                setBioModal(true)
                setSelectedCreator(creator)
            }} style={{height: "100%", width: "100%", position: "absolute", zIndex: 5, left: "0", top: "0"}}></div>
            <div style={{backgroundColor: "#886dd3", width: "fit-content", margin: "auto", borderRadius: "10px", padding: "2px 2px 2px 2px"}}>
                <img src={creator.pfp} style={{width: "100px", height: "100px", borderRadius: "10px"}}/>
            </div>
            <h2>{creator.firstName} {creator.lastName}</h2>
            <h3 style={{color: "#7F56D9"}}>{creator.position}</h3>
            <p>{creator.quote}</p>
            {creator.socials.map(({socialMediaName, link}) => <Link to={link} target="_blank" style={{position: 'relative', zIndex: "10"}}>{iconMap.get(socialMediaName)}</Link>)}


        </div>
    )
}

export default Creator