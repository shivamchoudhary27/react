import "./style.scss";
import View from "./view";
import { Link } from "react-router-dom";
import { AdminRawData } from "./rawData";
import { useSelector } from "react-redux";

const SiteAdminHome = () => {
  const permissions = useSelector(
    (state: any) => state.userAuthorities.permissions
  );

  const renderComponent = (item: any, index: number) => {
    let componentEnabled = true;
    if (item.component === "user" && !permissions.user.canView) {
      componentEnabled = false;
    } else if (item.component === "program" && !permissions.program.canView) {
      componentEnabled = false;
    } else if (
      item.component === "enrolment" &&
      !permissions.enrolment.program.canView
    ) {
      componentEnabled = false;
    } else if (
      item.component === "institute" &&
      !permissions.institute.canView
    ) {
      componentEnabled = false;
    }

    item.enabled = !componentEnabled;
    item.link = !componentEnabled ? "#" : item.link;

    return (
      <div key={index} className={`box ${item.boxclassname}`}>
        <Link
          to={item.link}
          className={`default-item ${item.classname}`}
          style={
            item.enabled
              ? { opacity: 0.4, boxShadow: "none", cursor: "not-allowed" }
              : { opacity: "none" }
          }
        >
          <h4
            className="card-title"
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
          <img src={item.image} alt={item.title} className="img-fluid" />
        </Link>
      </div>
    );
  };

  return <View adminRawData={AdminRawData} renderComponent={renderComponent} />;
};

export default SiteAdminHome;
