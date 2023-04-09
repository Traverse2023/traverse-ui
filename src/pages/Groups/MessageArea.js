import React from "react";

const MessageArea = () => {
    return (
        <div className="messageArea">
            <header># general</header>
            <div className="text-area">
                {[1, 2, 3, 4, 5].map((e) => {
                    return (
                        <div className="msg-container">
                            <div className="pfp"></div>
                            <div className="name-msg">
                                <ul>
                                    <li>rox 05/11/2022 3:05 PM</li> <br />
                                    <li>Hello My name is</li>
                                    <li>Millie</li>
                                    <li>Hello My name is</li>
                                    <li>Millie</li>
                                    <li>Hello My name is</li>
                                    <li>Millie</li>
                                    <li>Hello My name is</li>
                                    <li>Millie</li>
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="msg-input-div">
                <button className="plus">+</button>
                <textarea rows={0} className="msg-input" />
            </div>
        </div>
    );
};

export default MessageArea;
