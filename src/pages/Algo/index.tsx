import React, {useState} from "react";
import NavBar from "../../components/NavBar";
import { WidthProvider, Responsive} from "react-grid-layout";

const ResponsiveGridLayout =  WidthProvider(Responsive)
const Algo = () => {

    return (
        <div className="algo-container">
            <ResponsiveGridLayout
                className="layout"
                cols={{ lg: 4, md: 4, sm: 3, xs: 3, xxs: 3 }}
                rowHeight={1}
                style={{height: "100%", width: "100%"}}
                containerPadding={[0, 0]}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                margin={[0,0]}
                isBounded={true}
            >
                <div key="a" className="question" data-grid={{i: "a", x: 0, y: 0, w: 1, h: 100, isResizable: true}}>a</div>
                <div key="b" className="editor" data-grid={{i: "b", x: 1, y: 0, w: 2, h: 100, isResizable: true}}>b</div>
                <div key="c" className="result" data-grid={{i: "c", x: 1, y: 3, w: 2, h: 100, isResizable: true}}>c</div>
                <div key="d" className="communication" data-grid={{i: "d", x: 4, y: 0, w: 1, h: 100, isResizable: true}}>d</div>
            </ResponsiveGridLayout>
        </div>
    );
};

export default Algo;
