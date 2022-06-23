import React from "react";
import SidebarData from './SidebarData';
function Sidebar(props) {
    return (
        <>
            <aside className={`sidebar ${props.currentState ? "active" : "dis-none"}`} id="bar" data-region="drawer">
                    <ul className="Sidebarlist">
                        {SidebarData.map(function nbar(val, key) {
                            return (
                                <li key={val.index}
                                    className="row" onClick={() => {
                                        window.location.pathname = val.link;
                                    }}>
                                    <span><i className={val.icon}></i> &nbsp;{val.title}</span>
                                </li>
                            );
                        })}
                    </ul>
            </aside>
        </>
    );
}
export default Sidebar;