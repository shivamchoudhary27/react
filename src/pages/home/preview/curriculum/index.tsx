import React, { useState, useEffect } from "react";
import { getData } from "../../../../adapters/microservices";
import CurriculumTable from "./table";
import { updateCategoryLevels, getChildren } from "./../utils";
import { setHasChildProp, resetManageCourseObj } from './../local';
import { pagination } from "../../../../utils/pagination";
import axios from "axios";
import config from "../../../../utils/config";

const Curriculum = ({programId}: any) => {
    const [selectedProgram, setSelectedProgram] = useState(0);
    const [curriculumDropdown, setCurriculumDropdown] = useState([]);
    const [curriculumData, setCurriculumData] = useState([]);
    const [programData, setProgramData] = useState([]);
    const [apiStatus, setApiStatus] = useState("");
    const [filterUpdate, setFilterUpdate] = useState<any>({
      pageNumber: 0,
      pageSize: pagination.PERPAGE,
    });

    const getCurrentValue = (e : any) => {
        setSelectedProgram(e.target.value);
    }

    // Get category Data from API === >>
    useEffect(() => {
        const endPoint = `${config.JAVA_API_URL}/public/programs?pageNumber=${filterUpdate.pageNumber}&pageSize=${filterUpdate.pageSize}&Id=${programId}`;
        setApiStatus("started")
        axios.get(endPoint)
        .then((res: any) => { 
            if (res.data !== "" && res.status === 200) {
              setApiStatus("finished")
                setProgramData(res.data.items[0].categories);
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
    }, [programId]);

    
    useEffect(() => {
      if (selectedProgram > 0 && programData.length > 0) {
        const convertedResult = programData.filter(item => item.id == selectedProgram)
        .sort((a,b) => a.weight - b.weight)
            .reduce((acc, item) => [...acc, item, ...getChildren(item, programData)], []);
            
            convertedResult.forEach(item => {
              if (item.parent === 0) {
                item.level = 1;
                updateCategoryLevels(convertedResult, item.id, 2);
              }
            });
            const hasChildPropAdded = setHasChildProp(convertedResult);
            const courseObjAdded = resetManageCourseObj(hasChildPropAdded)
            courseObjAdded.shift();
            setCurriculumData(courseObjAdded);
          }
        }, [selectedProgram, programData]);
        
        useEffect(() => {
          if (programData.length > 0) {
            const parentCats = programData.filter((packet: any) => packet.parent === 0);
            if (parentCats.length > 0) {
              setCurriculumDropdown(parentCats);
              setSelectedProgram(parentCats[0].id);
            }
          }
        }, [programData])
        
        return (
          <div className="po-section curriculum-step mt-5">
            <h5 id="po-curriculum">
                Curriculum
                {(curriculumDropdown.length > 0) &&
                  <select
                  className="form-select"
                  value={selectedProgram} 
                  onChange={getCurrentValue}>
                  {curriculumDropdown.map((el: any, index: number) => (
                    <option key={index} value={el.id} data-name={el.name}>{el.name}</option>
                    ))}
                    </select>
                
                  }
            </h5>
            <div className="table-responsive">
            <CurriculumTable
                categoryData={curriculumData}
                apiStatus={apiStatus}
            />                   
            </div>
        </div>
    );
}

export default Curriculum;