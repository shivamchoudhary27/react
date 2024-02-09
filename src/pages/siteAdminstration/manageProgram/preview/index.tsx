import View from "./view";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData as getProgramData } from "../../../../adapters/microservices";

interface ICurrentProgram {
  data: [];
  status: boolean;
  id: string | undefined;
}

interface IApiParams {
  pageNumber: number;
  pageSize: number;
  Id: string | undefined;
}

const Preview = () => {
  const { id } = useParams();
  const [currentProgram, setCurrentProgram] = useState<ICurrentProgram>({
    data: [],
    status: false,
    id: id,
  });

  const [instructors, setInstructors] = useState([]);
  const instituteId = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  useEffect(() => {
    if (
      instituteId !== undefined &&
      instituteId > 0 &&
      id !== undefined &&
      id > 0
    ) {
      let programsEndPoint: string = `${instituteId}/programs`;
      const apiParams: IApiParams = {
        pageNumber: 0,
        pageSize: 5,
        Id: id,
      };
      getProgramData(programsEndPoint, apiParams).then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setCurrentProgram({ data: res.data.items, status: true, id: id });
          setInstructors(res.data.instructors);
        }
      });
    }
  }, [instituteId]);

  const previewMetafields = (metaData: Array<any>) => {
    return (
      <>
        {metaData.map((el: any, index: number) => (
          <div className="mt-5" key={index}>
            <h5>{el.title}</h5>
            <div dangerouslySetInnerHTML={{ __html: el.description }} />
          </div>
        ))}
      </>
    );
  };

  const previewTagfields = (metaData: Array<any>) => {
    return (
      <>
        <strong>Tags</strong>
        {metaData.map((el: any, index: number) => (
          <ul key={index}>
            <li>{el.name},</li>
          </ul>
        ))}
      </>
    );
  };

  return (
    <View
      instructorsData={instructors}
      currentProgram={currentProgram}
      previewTagfields={previewTagfields}
      previewMetafields={previewMetafields}
    />
  );
};
export default Preview;
