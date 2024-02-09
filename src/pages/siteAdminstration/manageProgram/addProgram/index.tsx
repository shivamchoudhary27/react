import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import View from "../addProgram/view/index"
import { useParams } from "react-router-dom";
import { initialValues, generateIinitialValues } from "./utils";
import { getData as getProgramData } from "../../../../adapters/microservices";


const AddProgram = () => {
  const { id } = useParams();
  const [currentProgram, setCurrentProgram] = useState<any>({
    data: {},
    status: false,
    id: id,
  });
  const instituteId = useSelector((state: any) => state.globalFilters.currentInstitute);

  useEffect(() => {
    if (instituteId !== undefined && instituteId > 0 && id !== undefined && id > 0) {
      let filter = { Id: id, pageNumber: 0, pageSize: 1 };
      let programsEndPoint = `/${instituteId}/programs`;
      getProgramData(programsEndPoint, filter).then((res: any) => {
        if (res.data.items !== "" && res.status === 200) {
          let programData = res.data.items.find((obj: any) => obj.id == id);
          if (programData !== undefined) {
            let newSet = generateIinitialValues(programData);
            setCurrentProgram({ data: newSet, status: true, id: id });
          } else {
            setCurrentProgram({ data: initialValues, status: true, id: id });
          }
        }
      });
    } else {
      setCurrentProgram({ data: initialValues, status: true, id: id });
    }
  }, [instituteId]);

  return (
    <View 
    currentProgram={currentProgram}
    instituteId={instituteId}
    />
    );
  };
  export default AddProgram;
     
 
