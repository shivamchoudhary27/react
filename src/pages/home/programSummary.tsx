import axios from "axios";
import { useEffect, useState } from "react";
import { pagination } from "../../utils/pagination";
import { useParams } from "react-router-dom";
import Footer from "../newFooter";
import { Link } from "react-router-dom";
import logo from "../../assets/images/circlelogo-blue.svg";
import { Container } from "react-bootstrap";

function ProgramSummary() {
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [programs, setPrograms] = useState([]);
  const { Programid } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.microlearning.ballisticlearning.com/learning-service/api/v1/public/programs?pageNumber=${filterUpdate.pageNumber}&pageSize=${filterUpdate.pageSize}`
      )
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          const filteredData = result.data.items.filter(
            (item: any) => item.id == Programid
          );
          setPrograms(filteredData);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [filterUpdate]);

  return (
    <>
     <div className="landing-wrapper programlist-wrapper">
      <div className="landing-header program-summary">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo-wrapper">
            <Link to="/">
              <img src={logo} alt="logo" className="img img-fluid" />
            </Link>
          </div>
        </div>
      </div>
  <Container fluid>
        {programs.map((program: any) => (
          <div key={program.id} className="card1 bg-white p-2 rounded shadow">
       <div className="d-flex gap-3 flex-wrap">
       <img src={program.files[0].url} alt={program.name} className="img img-fluid rounded" style={{width:"500px"}}/>
             <div className="d-flex flex-column">
             <h5 className="card-title">{program.name}</h5>
              <p
                className="card-text"
                dangerouslySetInnerHTML={{ __html: program.description }}
              ></p> 
             </div>
       </div>
            <div className="">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Program Code:</strong> {program.programCode}
                </li>
                <li className="list-group-item">
                  <strong>Mode of Study:</strong> {program.modeOfStudy}
                </li>
                <li className="list-group-item">
                  <strong>Batch Year:</strong> {program.batchYear}
                </li>
                <li className="list-group-item">
                  <strong>Full Lifetime Access:</strong>{" "}
                  {program.fullLifeTimeAccess ? "Yes" : "No"}
                </li>
                <li className="list-group-item">
                  <strong>Duration:</strong> {program.durationValue}{" "}
                  {program.durationUnit}
                </li>
                <li className="list-group-item">
                  <strong>Program Type:</strong> {program.programTypeName}
                </li>
                <li className="list-group-item">
                  <strong>Department Name:</strong> {program.departmentName}
                </li>
                <li className="list-group-item">
                  <strong>Discipline Name:</strong> {program.disciplineName}
                </li>
              </ul>
            </div>
          </div>
        ))}
  </Container>
  </div>
      {/* <Footer/> */}
    </>
  );
}

export default ProgramSummary;
