import FilterDropdown from "../../filterDropdown";

type Props = {};

const Mobile = (props: Props) => {
  return (
    <div className="mitblock activityTimeline-block">
      <h3 className="mitblock-title">Activity Timeline</h3>
      <FilterDropdown />
      <div className="mitblock-body">
        {tableData.map((item: any, index: number) => (
          <div className="d-flex align-items-center atb-row" key={index}>
            <div className="atb-info">
              <h6>{item.title}</h6>
              <p>{item.subtitle}</p>
              <span>{item.time}</span>
            </div>
            <a href="#" className="btn btn-light btn-sm atb-button">
              {item.link}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mobile;

const tableData = [
  {
    title: "The Natural Number System",
    subtitle: "Discrete Mathmatical Structures",
    link: "Add submission",
    time: "14 : 30",
  },
  {
    title: "Arrays",
    subtitle: "Data structure & Algorithms",
    link: "Attempt Quiz",
    time: "11 : 15",
  },
];
