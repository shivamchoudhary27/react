import React from "react";
import { Card, Button, Table } from "react-bootstrap";

const KeyInformation = () => {
  return (
    <React.Fragment>
      <Card style={{ backgroundColor: "#f1f1f1" }}>
        <Card.Body>
          <Card.Title className="text-muted">Key Information</Card.Title>
          <hr />
          <Card.Text>
            <Table borderless striped>
              {Object.entries(Data).map(([title, value], index) => (
                <tr key={index}>
                  <td>{title}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </Table>
          </Card.Text>
          <Button variant="secondary">Apply</Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default KeyInformation;

const Data = {
  Duration: "3 Years",
  "Programe Code": "ST3113",
  "Course Type": "Bachelor Degree",
  "Mode of Study": "Distance Learning",
  Rating: "3",
  Free: "5000",
};
