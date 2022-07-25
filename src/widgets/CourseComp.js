import React from "react";

function Cards(props) {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <img src={props.icon} /> 
                        {" "}{props.title}
                    </h5>
                </div>
            </div>
        </>
    );
}
export default Cards;