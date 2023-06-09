import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getData as getProgramData } from "../../../adapters/microservices";
import Header from "../../newHeader";
import Footer from "../../newFooter";
import HeaderTabs from "../../headerTabs";
import { Container } from "react-bootstrap";
import AddProgramForm from "./form";
import { useParams } from "react-router-dom";
import { initialValues, generateIinitialValues } from "./utils";
import BreadcrumbComponent from "../../../widgets/breadcrumb";
import PageTitle from "../../../widgets/pageTitle";
import "./style.scss";

const AddProgram = () => {
  const { id } = useParams();
  const location = useLocation().search;
  const [currentProgram, setCurrentProgram] = useState<any>({
    data: {},
    status: false,
    id: id,
  });
  const [instituteId, setInstituteId] = useState<number | string | null>(0);
  const pagetitle = id > 0 ? "Update program" : "Add program";

  useEffect(() => {
    const urlParams = new URLSearchParams(location);
    let instituteParam = parseInt(urlParams.get("institute"))
    setInstituteId(instituteParam);
  }, [location]);

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
    <>
      <Header />
      <HeaderTabs activeTab="siteadmin"/>
      <BreadcrumbComponent
        routes={[
          { name: "Site Administration", path: "/siteadmin" },
          { name: "Manage Program", path: "/manageprogram" },
          { name: "Add Program", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mt-3">
        <Container fluid>
          <PageTitle pageTitle={currentProgram.id == 0 ? "Add Program" : "Update Program"} gobacklink="/manageprogram" />
          {currentProgram.status === true && (
            <AddProgramForm
              initialformvalues={currentProgram.data}
              programid={currentProgram.id}
              instituteId={instituteId}
            />
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AddProgram;
