import React, { useState, useEffect } from 'react';
import Header from "../../../header";
import Sidebar from "../../../sidebar";
import { getData } from "../../../../adapters";
import "./style.scss";
import Errordiv from '../../../../widgets/alert/errordiv';

const Report = () => {
    const [course, setCourse] = useState();
    const [resource, setResource] = useState();
    const [show, setShow] = useState(false);
    // const [value, currentValue] = useState();

    useEffect(() => {
        const query = {
            wsfunction: 'core_course_get_courses',
        };

        getData(query)
            .then((res) => {
                if (res.data.errorcode) {
                    setShow(true);
                }

                else {
                    setShow(false);
                    setCourse(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        const query = {
            wsfunction: 'mod_resource_get_resources_by_courses',
        };

        getData(query)
            .then((res) => {
                if (res.data.errorcode) {
                    setShow(true);
                }

                else {
                    setShow(false);
                    setResource(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleChange(e) {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var option = optionElement.getAttribute('value');
        resource != undefined && resource.resources.map((data) => {
            if (option == data.course) {
                console.log(data.name);
            }
            else {
                console.log("no data");
            }
        });
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="main-container">
                <div className="contents">
                    {show === true ? <Errordiv cstate={show} msg="Something went wrong" /> :
                        <div className="pt-5">
                            <select onChange={handleChange} id="selct_item">
                                <option value="all">All</option>
                                {course != undefined && course.map((item, i) => (
                                    <option value={item.id} key={i}>{item.shortname}
                                    </option>
                                ))
                                }
                            </select>
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Tracked video</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resource != undefined && resource.resources.map((modname, i) => (
                                            <tr key={i} >
                                                <td>{modname.name}</td>
                                                <td></td>
                                                <td>--</td>
                                            </tr>

                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}
export default Report;