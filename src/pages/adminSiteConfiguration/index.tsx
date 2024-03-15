import Swal from "sweetalert2";
import Header from "../newHeader";
import Footer from "../newFooter";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import HeaderTabs from "../headerTabs";
import "sweetalert2/src/sweetalert2.scss";
import { Container } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import PageTitle from "../../widgets/pageTitle";
import React, { useState, useEffect } from "react";
import CkEditor from "../../widgets/editor/CKEditor";
import BreadcrumbComponent from "../../widgets/breadcrumb";
import FieldLabel from "../../widgets/formInputFields/labels";
import { getData, postData } from "../../adapters/coreservices";
import CustomButton from "../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../widgets/formInputFields/buttons";

type ConfigItem = {
  tab: string;
  type: string;
  config: string;
  tabTitle: string;
  label: string;
};

type Props = {};

const AdminSiteConfiguration = (props: Props) => {
  const [mailConfigData, setMailConfigData] = useState<ConfigItem[]>([]);
  const [tabTitles, setTabTitles] = useState<string[]>([]);

  useEffect(() => {
    let endPoint = `/config`;
    getData(endPoint, {}).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setMailConfigData(res.data);
        const tabTitlesList = [
          ...new Set(res.data.map((item: ConfigItem) => item.tabTitle)),
        ];
        setTabTitles(tabTitlesList);
      }
    });
  }, []);

  const handleFormSubmit = (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    let newValue = [
      { configKey: values.config_1, configValue: values.subject },
      {
        configKey: values.config_0,
        configValue: values.description,
      },
    ];
    setSubmitting(true)
    postData("config/save", newValue).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setSubmitting(false)
        Swal.fire({
          timer: 3000,
          width: "25em",
          color: "#666",
          icon: "success",
          background: "#e7eef5",
          showConfirmButton: false,
          text: "Mail has been successfully added."
        });
        resetForm();
      }
    }).catch((error) => {
      console.log(error)
    })
  };

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Mail Templates Configuration", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Mail Templates Configuration" gobacklink="/dashboard" />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                {tabTitles.length > 0 &&
                  tabTitles.map((tabTitle: string, index: number) => (
                    <React.Fragment key={index}>
                      <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey={index}>{tabTitle}</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={9}>
                        <Tab.Content>
                          <Tab.Pane eventKey={index}>
                            <Formik
                              initialValues={{
                                subject: "",
                                description: "",
                                ...mailConfigData
                                  .filter((item) => item.tabTitle === tabTitle)
                                  .reduce((acc, item, index) => {
                                    acc[`config_${index}`] = item.config;
                                    return acc;
                                  }, {}),
                              }}
                              onSubmit={(values, action) => {
                                handleFormSubmit(values, action);
                              }}
                            >
                              {({ isSubmitting, handleChange }) => (
                                <Form>
                                  <div className="d-flex flex-column">
                                    {mailConfigData
                                      .filter((item) => item.tabTitle === tabTitle)
                                      .sort((a, b) => {
                                        if (a.type === "textfield" && b.type === "textarea") {
                                          return -1;
                                        } 
                                        else if (a.type === "textarea" && b.type === "textfield") {
                                          return 1;
                                        }
                                        return 0;
                                      })
                                      .map((item, index) => (
                                        <React.Fragment key={index}>
                                          <Field
                                            type="text"
                                            name={`config_${index}`}
                                            hidden
                                          />
                                          {item.type === "textfield" && (
                                            <>
                                              <FieldLabel
                                                htmlfor="subject"
                                                labelText={item.label}
                                                // required="required"
                                              />
                                              <Field
                                                type="text"
                                                name="subject"
                                                placeholder="Subject"
                                              />
                                            </>
                                          )}
                                          {item.type === "textarea" && (
                                            <>
                                              <FieldLabel
                                                htmlfor="description"
                                                labelText={item.label}
                                                // required="required"
                                              />
                                              <CkEditor
                                                name="description"
                                                handleChange={handleChange}
                                              />
                                            </>
                                          )}
                                        </React.Fragment>
                                      ))}

                                    {isSubmitting === false ? (
                                      <div className="modal-buttons">
                                        <CustomButton
                                          type="submit"
                                          variant="primary"
                                          isSubmitting={isSubmitting}
                                          btnText="Submit"
                                        />{" "}
                                        <CustomButton
                                          type="reset"
                                          btnText="Reset"
                                          variant="outline-secondary"
                                        />
                                      </div>
                                    ) : (
                                      <LoadingButton
                                        variant="primary"
                                        btnText="Submitting..."
                                        className="modal-buttons"
                                      />
                                    )}
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </React.Fragment>
                  ))}
              </Row>
            </Tab.Container>
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdminSiteConfiguration;
