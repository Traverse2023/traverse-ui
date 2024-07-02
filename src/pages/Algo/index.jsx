import React, {useState} from "react";
import NavBar from "../../components/NavBar";
import GridLayout from "react-grid-layout";

const Algo = () => {
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: "c", x: 4, y: 0, w: 1, h: 2 }
    ];
    return (
        <div className="algo-container">
            <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={100}
                width={1200}
                style={{height: '100%'}}
            >
                <div key="a" className="question">a</div>
                <div key="b" className="editor">b</div>
                <div key="c" className="result">c</div>
            </GridLayout>
        </div>
    );
};

export default Algo;
