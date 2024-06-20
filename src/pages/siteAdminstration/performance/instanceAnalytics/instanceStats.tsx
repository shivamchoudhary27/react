import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaBuildingColumns, FaGraduationCap } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoBook } from "react-icons/io5";


const InstanceStats = () => {
    const stats = [
        { icon: <FaBuildingColumns />, value: 15, label: "Number of institutes" },
        { icon: <FaUsers />, value: 2576, label: "Total Number of users" },
        { icon: <FaGraduationCap />, value: 112, label: "Programs Published" },
        { icon: <IoBook />, value: 832, label: "Courses Published" }
    ];

    return (
        <>
            <div className='d-flex flex-column gap-1'>
                {stats.map((stat, index) => (
                    <div key={index} className='instancestat-wrapper'>
                        <Card className="m-1">
                            <Card.Body className='d-flex align-items-center gap-3'>
                                <div className='stat-icon rounded-circle'>
                                    {stat.icon}
                                </div>
                                <div className='d-flex flex-column stat-values'>
                                    <span>{stat.value}</span>
                                    <label>{stat.label}</label>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
};

export default InstanceStats;
