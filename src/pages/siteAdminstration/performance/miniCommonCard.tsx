import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const MiniCommonCard = () => {
    const stats = [
        { icon: "bi-bank", value: 15, label: "Number of institutes" },
        { icon: "bi-people", value: 2576, label: "Total Number of users" },
        { icon: "bi-book", value: 832, label: "Courses Published" },
        { icon: "bi-mortarboard", value: 112, label: "Programs Published" }
    ];

    return (
        <Container style={{width:"100%", height:300}}>
            <Row>
                {stats.map((stat, index) => (
                    <div key={index}>
                        <Card className="rounded-pill m-1">
                            <Card.Body>
                                <i className={`bi ${stat.icon} display-4 mb-3`} style={{ display: "inline" }}></i>
                                <div style={{ display: "inline" }}><span>{stat.value}</span> {stat.label}</div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Row>
        </Container>
    );
};

export default MiniCommonCard;