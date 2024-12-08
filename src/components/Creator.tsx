import {Link} from "react-router-dom";
import LinkedIn from "./icons/LinkedIn";
import Github from "./icons/Github";

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
        ["LinkedIn", <LinkedIn />],
        ["Github", <Github />]
    ]
)


const Creator = ({setBioModal, creator, setSelectedCreator}: {
    setBioModal: any,
    creator: Creator,
    setSelectedCreator: any
}) => {


    return (
        <div className="bio-card" style={{
            backgroundColor: "white",
            padding: "20px 10px 20px 10px",
            borderRadius: "10px",
            height: '340px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div onClick={() => {
                setBioModal(true)
                setSelectedCreator(creator)
            }} style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                zIndex: 5,
                left: "0",
                top: "0",
                flexGrow: '25px'
            }}></div>
            <div style={{
                backgroundColor: "#F0B62B",
                margin: "auto",
                borderRadius: "10px",
                padding: "2px 2px 2px 2px",
                width: "100px",
                height: "100px"
            }}>
                <img src={creator.pfp} style={{width: "100px", height: "100px", borderRadius: "10px"}}/>
            </div>
            <h2 style={{marginBottom: "0px"}}>{creator.firstName} {creator.lastName}</h2>
            <h3 style={{color: "#F0B62B", flexGrow: '25px', marginBottom: "0"}}>{creator.position}</h3>
            <p style={{flexGrow: '25px'}}>{creator.quote}</p>
            <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: '10px',
                flexGrow: '25px'
            }}>
                {creator.socials.map(({socialMediaName, link}) => <Link to={link} target="_blank" style={{
                    position: 'relative',
                    zIndex: "10",
                }}>{iconMap.get(socialMediaName)}</Link>)}
            </div>
        </div>
    )
}

export default Creator