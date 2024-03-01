import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { getData } from "../../adapters/microservices";
import { pagination } from "../../utils/pagination";
import Multiselect from "multiselect-react-dropdown";

interface ProgramFilter {
  allPrograms: any[];
  onDataFilterChange: (dataFilter: any) => void;
}

const Filter: React.FC<ProgramFilter> = ({ onDataFilterChange}) => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [programTypes, setProgramTypes] = useState<any[]>([]);
  const [disciplines, setDisciplines] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [instituteList, setInstituteList] = useState<any[]>([]);
  const [filterUpdate, setFilterUpdate] = useState<any>({
    pageNumber: 0,
    pageSize: pagination.PERPAGE,
  });

  const formRef = useRef<HTMLFormElement>(null); // Reference to the form element
  const disciplineRef = useRef<HTMLFormElement>(null);
  const tagRef = useRef<HTMLFormElement>(null);
  const [dataFilter, setDataFilter] = useState<any[]>({
    departments: [],
    programTypes: [],
    disciplines: [],
    tags: [],
    Institutes: "",
  });
 
  useEffect(() => {
    onDataFilterChange(dataFilter);
  }, [dataFilter]);
  
  useEffect(() => {
    fetchData("departments", setDepartments);
    fetchData("program-types", setProgramTypes);
    fetchData("disciplines", setDisciplines);
    fetchData("tags", setTags);
  }, [dataFilter.Institutes]);

  useEffect(() => {
    fetchInstitutes();
  }, []);
  
  const fetchData = async (endpoint: string, setter: Function) => {
    try {
      if (dataFilter.Institutes) {
        const response = await axios.get(
          `https://api.microlearning.ballisticlearning.com/learning-service/api/v1/public/${dataFilter.Institutes}/${endpoint}?pageNumber=0&pageSize=10`
        );
        setter(response.data);
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };
  
    
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get(
          `https://api.microlearning.ballisticlearning.com/learning-service/api/v1/public/institutes?pageNumber=0&pageSize=30`
          );
          
          if(response.data ){
            const instituteData= response.data.items.filter((institute)=> {
              return institute.locked;
            })
            setDataFilter((prevState) => ({
              ...prevState,
              Institutes: instituteData[0].id,
            }));

            setInstituteList(instituteData);
          }
          
          // -----------------------===== for default value of institute filter ===============---------------------
          
         
    
              
            
          } catch (error) {
      
      console.error("Error fetching institutes:", error);
    }
  };

  function handleinstituteId(e: React.ChangeEvent<HTMLSelectElement>) {
    
    const value = e.target.value;
    setDataFilter({
      departments: [],
      programTypes: [],
      disciplines: [],
      tags: [],
      Institutes: value,
  })
  disciplineRef.current?.resetSelectedValues();
  tagRef.current?.resetSelectedValues();
}

  function handleProgramTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    setDataFilter((prevState) => ({
      ...prevState,
      programTypes: checked
        ? [...prevState.programTypes, value]
        : prevState.programTypes.filter((dep) => dep !== value),
    }));
  }

  function handleDepartmentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;

    setDataFilter((prevState) => ({
      ...prevState,
      departments: checked
        ? [...prevState.departments, value]
        : prevState.departments.filter((dep) => dep !== value),
    }));
  }

  function handleDisciplineSelect(selectedList: any) {
    const selectedDisciplines = selectedList.map((item: any) => item.id);
    setDataFilter((prevState) => ({
      ...prevState,
      disciplines: selectedDisciplines,
    }));
  }

  function handleDisciplineRemove(selectedList: any) {
    const selectedDisciplines = selectedList.map((item: any) => item.id);
    setDataFilter((prevState) => ({
      ...prevState,
      disciplines: selectedDisciplines,
    }));
  }

  function handletagSelect(selectedList: any) {
    const selectedtags = selectedList.map((item: any) => item.id);
    setDataFilter((prevState) => ({
      ...prevState,
      tags: selectedtags,
    }));
  }

  function handletagRemove(selectedList: any) {
    const selectedtags = selectedList.map((item: any) => item.id);
    setDataFilter((prevState) => ({
      ...prevState,
      tags: selectedtags,
    }));
  }

  function hendleClearFilter() {
    formRef.current?.reset(); // Reset the form
    disciplineRef.current?.resetSelectedValues();
    tagRef.current?.resetSelectedValues();

    setFilterUpdate({
      pageNumber: 0,
      pageSize: pagination.PERPAGE,
    });
    setDataFilter({
      departments: [],
      programTypes: [],
      disciplines: [],
      tags: [],
      Institutes: instituteList[0].id,
    });
  }

  return (
    <Col md={3}>
      <form ref={formRef}>
        <div className="programlist-filters">
          <h4>List By Filters</h4>
          <hr />
          {/* Institute Filter */}
          <Form.Group controlId="formGridInstitute" className="mb-3">
            <Form.Label>Institute</Form.Label>
            <Form.Control
              as="select"
            
              onChange={handleinstituteId}
            >
              {instituteList &&
                instituteList.map((institute) => (
                  <option key={institute.id} value={institute.id}>
                    {institute.name}
                  </option>
                  ))}
            </Form.Control>
          </Form.Group>
          {/* Program Type Filter */}
          <Form.Group className="mb-3">
            <Form.Label>Program Type</Form.Label>
            {programTypes &&
              programTypes.items &&
              programTypes.items.map((programType) => (
                <Form.Check
                  key={programType.id}
                  value={programType.id}
                  type="checkbox"
                  label={programType.name}
                  onChange={handleProgramTypeChange}
                />
              ))}
          </Form.Group>
          {/* Department Filter */}
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            {departments &&
              departments.items &&
              departments.items.map((department) => (
                <Form.Check
                  key={department.id}
                  type="checkbox"
                  label={department.name}
                  value={department.id}
                  onChange={handleDepartmentChange}
                />
              ))}
          </Form.Group>

          {/* Discipline Filter */}
          <Form.Label>Discipline</Form.Label>
          <Multiselect
            ref={disciplineRef}
            options={
              disciplines && disciplines.items
                ? disciplines.items.map((discipline) => ({
                    id: discipline.id,
                    name: discipline.name,
                  }))
                : []
            }
            displayValue="name"
            onSelect={handleDisciplineSelect}
            onRemove={handleDisciplineRemove}
            placeholder="Select disciplines"
          />

          {/* Tags Filter */}
          <Form.Label>Tags</Form.Label>
          <Multiselect
            ref={tagRef}
            options={
              tags && tags.items
                ? tags.items.map((tags) => ({
                    id: tags.id,
                    name: tags.name,
                  }))
                : []
            }
            displayValue="name"
            onSelect={handletagSelect}
            onRemove={handletagRemove}
            placeholder="Select tags"
          />

          {/* Clear All Filters Button */}
          <Button variant="link" onClick={hendleClearFilter}>
            Clear All Filters
          </Button>
        </div>
      </form>
    </Col>
  );
};

export default Filter;
