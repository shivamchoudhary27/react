import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Header from "../../header";
import Sidebar from "../../sidebar";
import ProgramTable from "./programTable";
import AddProgramModal from "./modal";
import { useNavigate } from "react-router-dom";

const ProgramType = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [programTypeData, setProgramTypeData] = useState<any>([]);

  const token =
    "eyJraWQiOiJmNzczNzliNS0zZTY3LTQyM2ItYTQwZS1mNTIwN2I4ZDNhNDMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbG9rIiwiaXNzIjoiaHR0cDovLzEyNy4wLjAuMTo4MDgwL29hdXRoMi1zZXJ2aWNlIiwibGFzdF9uYW1lIjoiS3VtYXIiLCJsb2NhbGUiOiJlbiIsImF1ZCI6Im1vb2RsZSIsIm5iZiI6MTY3NTk0MDcwOSwic2NvcGUiOlsib3BlbmlkIl0sIm5hbWUiOiJhbG9rIiwiZXhwIjoxNjc4OTQwNzA5LCJpYXQiOjE2NzU5NDA3MDksImZpcnN0X25hbWUiOiJBbG9rIiwiZW1haWwiOiJhbG9rQGdtYWlsLmNvbSJ9.QEuWM3yznkXPkgMSnxhBjJDP0tnhH7dQoAln6YBNi-sq8JshPTS976TZzwDEWGk6u2du4-FOS__cN5paYuGGGyc3oOz0zQ518NQfsdMuAWfyzym3nfH65IjjuClygoKD-J4hZ6Zzdw-0NkI7dopXquIjXRUm38PL7Ik7EOQiaZ0JneNo5jbq9HqfigfDXFHb6qqC8Xvzyr_6zs6Dlg_x5EZ3f9AbIuA9MIclQTGOvBS95Eqy6dgnJ9Fu5VtX6O7UDxEZ4ISthLKEmH5nfXXa97P6WywHhV4Hszha8H4-IU2cA6rOD3xdqJvGHM8K-te566IMlEi6dCe-mSXWgZPtxA";

  const myHeaders = new Headers({
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  const apiCall = async () => {
    const res = await fetch(
      "http://40.114.33.183:8081/learning-service/api/v1/program-types",
      {
        headers: myHeaders,
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setProgramTypeData(result);
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  };

  useEffect(() => {
    apiCall();
  }, []);

  console.log(programTypeData);

  return (
    <>
      <Header pageHeading="" welcomeIcon={false} />
      <Sidebar />
      <Container fluid>
        <div
          className="contents"
          style={{ paddingLeft: "270px", marginTop: "70px" }}
        >
          <div className="container-wrapper">
            <div className="site-heading">
              <h3>Program Type</h3>
            </div>
          </div>
          <hr />
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Program Type
          </Button>{" "}
          <Button
            variant="outline-secondary"
            onClick={() => navigate("/manageprogram")}
          >
            Go back
          </Button>
          {" "}
          <Button variant="outline-secondary" onClick={() => navigate("/manageprogram")}>Go back</Button>
          <AddProgramModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <ProgramTable programTypeData={programTypeData} />
        </div>
      </Container>
    </>
  );
};

export default ProgramType;
