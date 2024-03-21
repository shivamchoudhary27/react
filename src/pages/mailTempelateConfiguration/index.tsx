import View from "./view";
import { useEffect, useState } from "react";
import { getData, postData } from "../../adapters/coreservices";

type ConfigItem = {
  tab: string;
  type: string;
  config: string;
  tabTitle: string;
  label: string;
  availableVariables: string;
};

const MailTempelateConfiguration = () => {
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const [tabTitles, setTabTitles] = useState<string[]>([]);
  const [initialSubject, setInitialSubject] = useState("");
  const [getConfigApiStatus, setGetConfigApiStatus] = useState("");
  const [initialDescription, setInitialDescription] = useState("");
  const [mailConfigData, setMailConfigData] = useState<ConfigItem[]>([]);

  useEffect(() => {
    let endPoint = `/config`;
    setGetConfigApiStatus("started");
    getData(endPoint, {}).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setMailConfigData(res.data);
        const tabTitlesList = [
          ...new Set(res.data.map((item: ConfigItem) => item.tabTitle)),
        ];
        setTabTitles(tabTitlesList);
      }
      setGetConfigApiStatus("finished");
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTab !== "") {
        setLoading(true);
        let selectedConfigList = mailConfigData
          .filter((item) => item.tabTitle === selectedTab)
          .map((el) => el.config);

        try {
          setApiStatus("started");
          let endPoint = `/config`;
          const res = await postData(endPoint, selectedConfigList);
          if (res.data !== "" && res.status === 200) {
            let subject = "";
            let description = "";
            res.data.forEach((item: any) => {
              const config = item.configKey.substring(
                item.configKey.lastIndexOf("_") + 1
              );
              if (config === "subject") {
                subject = item.configValue;
              } else {
                description = item.configValue;
              }
            });
            setInitialSubject(subject);
            setInitialDescription(description);
            setLoading(false);
          }
          setApiStatus("finished");
        } catch (error) {
          console.error("Error fetching initial values:", error);
          setApiStatus("finished");
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedTab, refreshData]);

  const toggleRefresh = () => {
    setRefreshData(!refreshData);
  };

  return (
    <>
      <View
        loading={loading}
        apiStatus={apiStatus}
        tabTitles={tabTitles}
        mailConfigData={mailConfigData}
        initialSubject={initialSubject}
        getConfigApiStatus={getConfigApiStatus}
        initialDescription={initialDescription}
        toggleRefresh={toggleRefresh}
        setSelectedTab={setSelectedTab}
      />
    </>
  );
};

export default MailTempelateConfiguration;
