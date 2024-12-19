import React from 'react';
import "./style.css";

const CustomLoader = (props: any) => {
    
    return (
        <React.Fragment>
            <div className="containerr">
              <div className="loadingg">
                <h2>{props.text}</h2>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
        </React.Fragment>
    );
}

export default CustomLoader;