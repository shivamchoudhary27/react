import axios from "axios";
import { useEffect, useState } from "react";
import { pagination } from "../../utils/pagination";
import { useParams } from "react-router-dom";

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
      <div className="card-container">
        {programs.map((program: any) => (
          <div key={program.id} className="card">
            <img src={program.files[0].url} alt="ADD IMAGE" className="card-img-top" style={{width:"500px"}}/>
            <div className="card-body">
              <h5 className="card-title">{program.name}</h5>
              <p
                className="card-text"
                dangerouslySetInnerHTML={{ __html: program.description }}
              ></p>
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
      </div>
    </>
  );
}

export default ProgramSummary;
