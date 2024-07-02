import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faComment, faShare, faBookmark, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import FeedComments from "./FeedComments";
import {useState} from "react";
import NavBar from "../../components/NavBar";
const Post = ({type, content}) => {

    const [seeMore, setSeeMore] = useState(false)
    console.log('conlen', content?.length)
    const contentUpTo = 1351

    const [isScrolling, setScrolling] = useState(false);

    const handleScroll = () => {
        setScrolling(true);
    };
    return (
        type === "feed" ?
            <div className="feed-post">
                <div className="feed-content">
                    <header onClick={()=>window.location='/post'}>Will this work?</header>
                    {
                        content?.length > contentUpTo ?
                            !seeMore ?
                                <div className="feed-post-body">
                                    {content?.substring(0, contentUpTo)}
                                    <span><div onClick={() => setSeeMore(true)}>See More</div></span>
                                </div>
                                :
                                <div className="feed-post-body scroll">
                                    {content}
                                    <span><div onClick={() => setSeeMore(false)}>See Less</div></span>
                                </div>
                            :
                            <div className="feed-post-body" dangerouslySetInnerHTML={{__html: content}}>

                            </div>

                    }

                    <footer>
                        <div className="action-groups">
                            <div className="action-group">
                                <FontAwesomeIcon icon={faArrowUp}/>
                                <label>Upvote</label>
                            </div>
                            <div className="action-group">
                                <FontAwesomeIcon icon={faArrowDown}/>
                                <label>Downvote</label>
                            </div>
                            <div className="action-group">
                                <FontAwesomeIcon icon={faComment}/>
                                <label>61 comments</label>
                            </div>
                            <div className="action-group">
                                <FontAwesomeIcon icon={faShare}/>
                                <label>Share</label>
                            </div>
                            <div className="action-group">
                                <FontAwesomeIcon icon={faBookmark}/>
                                <label>Save</label>
                            </div>
                        </div>
                    </footer>
                </div>
                <FeedComments/>
            </div>
            :<div>
                Post
            </div>

    )
}

export default Post