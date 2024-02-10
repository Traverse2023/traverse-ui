import Post from "./Post";
import Modal from "../../components/Modal";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ReactQuill from "react-quill";
import Editor from "./CreatePost";
import {useInfiniteQuery} from "react-query";
import axios from "axios";

const FeedArea = () => {
    const [createPostModal, setCreatePostModal] = useState(false)
    const [newPostContent, setNewPostContent] = useState(false)
    useEffect(() => {
        console.log('npc', newPostContent)
    }, [newPostContent])
    const [posts, setPosts] = useState([])

    // const fetchData= async ({pageParam}) => {
    //     const offset = pageParam ? pageParam : 0;
    //     const data = await axios.get(
    //         `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${LIMIT}`
    //     );
    //     return {
    //         results: data.data.results,
    //         offset: offset + LIMIT,
    //     };
    // };
    // const {
    //     data,
    //     error,
    //     fetchNextPage,
    //     hasNextPage,
    //     isFetching,
    //     isLoading,
    // } = useInfiniteQuery('data', fetchData, {
    //     getNextPageParam: (lastPage, pages) => lastPage.offset,
    // });
    //
    // const flattenedData = useMemo(
    //     () => (data ? data?.pages.flatMap(item => item.results) : []),
    //     [data]
    // );
    //
    // const observer = useRef();
    // const lastElementRef = useCallback(
    //     (node) => {
    //         if (isLoading) return;
    //         if (observer.current) observer.current.disconnect();
    //         observer.current = new IntersectionObserver(entries => {
    //             if (entries[0].isIntersecting && hasNextPage && !isFetching) {
    //                 fetchNextPage();
    //             }
    //         });
    //         if (node) observer.current.observe(node);
    //     },
    //     [isLoading, hasNextPage]
    // );

    const modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
    };

    const formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];

    const handleProcedureContentChange = (content) => {
        console.log("content---->", content);
    };

    const createPostHandler = () => {
        console.log('44npc', newPostContent)
        setCreatePostModal(false)
        setPosts(prevState => [...prevState, {content: newPostContent}])
    }

    return (
        <div className="feed-area">
            <div className="create-post" onClick={()=>{setCreatePostModal(true);setNewPostContent(false)}}>Create Post</div>
            <div className="feed-posts">
                {posts.map(post => <Post type="feed" content={post.content}/>
                )}
                <Post type="feed" content="LLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Iporem Ipsum is simply dummy text of the printing and typesetting industryLorem IpLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IpLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IpLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IpLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Iporem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."/>
                <Post type="feed" content="LLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IporemLLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Iporem Ipsum is simply dummy text of the printing and typesetting industryLorem IpLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IpLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IpLorem Ipsum is simply dummy text of the printing and typesetting industryLorem IpLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Iporem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.seadgifweohgwoeihgweoighwoeihnvgiehqfgohqeofgqeowifhowhegfoiwejhfgiuawehfiouwehFIUWHEFUIHWEFUHWEFIUWEHFIUWEHF"/>
                <Post type="feed" content="Hey there"/>
                <Post type="feed" content="Hey"/>
                <Post type="feed" content="Nice weather"/>

            </div>
            <Modal
                show={createPostModal}
                setModalStatus={setCreatePostModal}
                style={{height: 'fit-content', width: '800px'}}
            >
                <h1 style={{
                    textAlign: "left",
                    color: "rgb(127, 86, 217)",
                    fontWeight: "bolder"
                }}>Create Post</h1>
                <br/>
                <Editor setNewPostContent={setNewPostContent}/>
                <br/>
                <button onClick={createPostHandler} className="auth-btn" style={{marginRight: "0"}}>
                    Create
                </button>
            </Modal>
        </div>
    )
}

export default FeedArea