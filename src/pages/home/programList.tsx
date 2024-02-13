import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { pagination } from "../../utils/pagination";
import DsaImage from "../../assets/images/course-data-structure.svg";
import CloudImage from "../../assets/images/course-cloud-computing.svg";
// import MathsImage from "../../assets/images/course-discrete-mathematics.svg";
import logo from "../../assets/images/circlelogo-blue.svg";

function ProgramList() {
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });
  const [allPrograms, setAllPrograms] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.microlearning.ballisticlearning.com/learning-service/api/v1/public/programs?pageNumber=${filterUpdate.pageNumber}&pageSize=${filterUpdate.pageSize}`
      )
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          setAllPrograms(result.data.items);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [filterUpdate]);


  return (
    <div className="landing-wrapper">
      <div className="landing-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo-wrapper">
            <img src={logo} alt="logo" className="img img-fluid" />
          </div>
        </div>
      </div>

      <div className="landing-courses">
        <div className="courseswrapper">
          <div>
            {allPrograms.map((program:any) => (
              <Link
                key={program.id}
                to={{ pathname: `/programsummary/${program.id}` }}
              >
                <div className="course-container">
                  <div className="course-image">
                    <img
                      src={program.files[0].url}
                      className="img img-fluid"
                      alt="Discrete Mathematics"
                      style={{width:"500px"}}
                    />
                  </div>
                  <div className="course-title">{program.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramList;
