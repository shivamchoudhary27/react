import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import userPixDefault from "../../../../assets/images/user-pix.svg"
import positionIcon from "../../../../assets/images/icons/degree.svg";
import campusIcon from "../../../../assets/images/icons/campus.svg";

// interface Instructor {
//     id: number;
//     username: string;
//     email: string;
//     lang?: string | null;
//     firstName?: string;
//     lastName?: string;
//     // Add any other properties if needed
// }

const ProgramInstructors = ({ instructorsData } : any) => {
    return (
        <React.Fragment>
            <h5 id="po-instructor">Instructor</h5>
            {instructorsData.map((instructor, index) => (
            (index % 3 === 0) && <Row key={index}> {/* Start a new row after every 3 items */}
                {instructorsData.slice(index, index + 3).map((instructor) => (
                <Col md={3} className="instructor-list" key={instructor.id}>
                    <Image
                        src={userPixDefault}
                        alt={instructor.firstName}
                        roundedCircle
                    />
                    <div className="ms-3">
                    <h6>{`${instructor.firstName} ${instructor.lastName}`}</h6>
                    <p>
                        <Image src={positionIcon} alt="Position" />{" "}
                        Assistant Professor
                    </p>
                    <p>
                        <Image
                            src={campusIcon}
                            alt="Campus"
                            className="campus-icon"
                        />{" "}
                        {instructor.email}
                    </p>
                    </div>
                </Col>
                ))}
            </Row>
            ))}
        </React.Fragment>
    )
}

export default ProgramInstructors;