import Swal from "sweetalert2";
import Header from "../newHeader";
import Footer from "../newFooter";
import Tab from "react-bootstrap/Tab";
import HeaderTabs from "../headerTabs";
import "sweetalert2/src/sweetalert2.scss";
import { Container, Tabs } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import PageTitle from "../../widgets/pageTitle";
import React, { useState, useEffect } from "react";
import CkEditor from "../../widgets/editor/CKEditor";
import BreadcrumbComponent from "../../widgets/breadcrumb";
import FieldLabel from "../../widgets/formInputFields/labels";
import { getData, postData } from "../../adapters/coreservices";
import CustomButton from "../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../widgets/formInputFields/buttons";
import { BackgroundWaveBottomRight, BackgroundWaveRight } from "../../widgets/backgroundElements";
import "./style.scss";

type ConfigItem = {
  tab: string;
  type: string;
  config: string;
  tabTitle: string;
  label: string;
};


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
       <div className="my-3">
       <Container fluid>
            <PageTitle pageTitle="Mail Templates Configuration" gobacklink="/dashboard" className="mt-2" />
           <div className="mailconfig-tabs">
           <Tabs
              defaultActiveKey={0}
              className="tabStep-indicator mb-3"
              justify
            >
              {tabTitles.length > 0 &&
                tabTitles.map((tabTitle: string, index: number) => (
                  <Tab eventKey={index} title={tabTitle}>
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
                                        labelText={`${item.label} *`}
                                       className="mb-1 mt-2"
                                       required="required"
                                      />
                                      <Field
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        className="mb-2"
                                        required="required"

                                      />
                                    </>
                                  )}
                                  {item.type === "textarea" && (
                                    <>
                                      <FieldLabel
                                        htmlfor="description"
                                        labelText={`${item.label} *`}
                                       className="mb-1 mt-2"
                                       required="required"
                                      />
                                      <CkEditor
                                        name="description"
                                        handleChange={handleChange}
                                        required="required"
                                      />
                                    </>
                                  )}
                                </React.Fragment>
                              ))}

                            {isSubmitting === false ? (
                              <div className="modal-buttons my-3">
                                <CustomButton
                                  type="submit"
                                  variant="primary"
                                  isSubmitting={isSubmitting}
                                  btnText="Submit"
                                />
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
                  </Tab>
                ))}
            </Tabs>
           </div>
          </Container>
       </div>
      </div>
      <Footer />
      <BackgroundWaveBottomRight/>
    </React.Fragment>
  );
};

export default AdminSiteConfiguration;
