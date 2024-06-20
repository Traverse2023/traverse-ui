import FeedArea from "./FeedArea";
import React, {useEffect, useState} from "react";


const Feed = () => {
    const [showComments, setShowComments] = useState(false)

    useEffect(() => {
        console.log('checked', showComments)
    }, [showComments]);

    return (
    // <div className={showComments ? "feed-container-show" : "feed-container"}>
        <div className={`feed-container ${showComments ? 'feed-container-show' : ''}`}>
        <div className="left-panel">
            <h3>Preferences</h3>
            <div className="checkbox-wrapper-3">
                <input type="checkbox" id="cbx-3" onChange={()=>setShowComments(prevState => !prevState)}/>
                <label htmlFor="cbx-3" className="toggle"><span></span></label>
            </div>
            <label>Show Comments</label>
            <br/><br/>
            <div className="checkbox-wrapper-3">
                <input type="checkbox" id="cbx-3"/>
                <label htmlFor="cbx-3" className="toggle"><span></span></label>
            </div>
            <label>Saved Posts</label>
            <br/><br/>
            <div className="checkbox-wrapper-3">
                <input type="checkbox" id="cbx-3" onChange={()=>setShowComments(prevState => !prevState)}/>
                <label htmlFor="cbx-3" className="toggle"><span></span></label>
            </div>
            <label>My Posts</label>
        </div>
        <FeedArea/>
            {/*<Draggable>*/}
            {/*    <div className={`mini-media-controls ${showControls ? 'visible' : ''}`}></div>*/}
            {/*    <div className="floating-button">Button</div>*/}
            {/*</Draggable>*/}
    </div>
    )
}

export default Feed
