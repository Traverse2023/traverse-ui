const FeedComments = () => {

    const comments = [
        {
            firstName: "Isfar",
            lastName: "Oshir",
            pfpURL: "https://traverse-profile-pics.s3.amazonaws.com/photos/isfar.jpg",
            comment: "Hey that's great!"
        },
        {
            firstName: "Bryan",
            lastName: "Palomo",
            pfpURL: "https://traverse-profile-pics.s3.amazonaws.com/pfps/blank-pfp.png",
            comment: "That's awesome!"
        },
        {
            firstName: "Farhan",
            lastName: "Mashud",
            pfpURL: "https://traverse-profile-pics.s3.amazonaws.com/pfps/blank-pfp.png",
            comment: "Crazy!!!"
        },
        {
            firstName: "Farhan",
            lastName: "Mashud",
            pfpURL: "https://traverse-profile-pics.s3.amazonaws.com/pfps/blank-pfp.png",
            comment: "Crazy!!!"
        },
        {
            firstName: "Farhan",
            lastName: "Mashud",
            pfpURL: "https://traverse-profile-pics.s3.amazonaws.com/pfps/blank-pfp.png",
            comment: "Crazy!!!"
        }
    ]

    return (
        <div className="feed-comments">
            <h4 style={{paddingLeft: '20px'}}>Comments</h4>
            <div className="comments-container">
                {comments.map(comment =>
                    <div className="feed-comment-group">
                        <img src={comment.pfpURL} />
                        <div className="feed-comment-container">
                            <h5>{comment.firstName} {comment.lastName}</h5>
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FeedComments