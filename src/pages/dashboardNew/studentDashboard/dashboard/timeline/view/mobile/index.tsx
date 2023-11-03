import { Link } from "react-router-dom";
import FilterDropdown from "../../filterDropdown";
import Errordiv from "../../../../../../../widgets/alert/errordiv";
import ListSkeleton from "../../../../../../../widgets/skeleton/list";

type Props = {
  apiStatus: string;
  blTimelineEvent: any;
  getTimetableTime: any;
  formatDynamicTimestamp: any;
};

const Mobile = (props: Props) => {
  return (
    <div className="mitblock activityTimeline-block">
      <h3 className="mitblock-title">Activity Timeline</h3>
      <FilterDropdown blTimelineEvent={props.blTimelineEvent} />
      <div className="mitblock-body">
        {props.apiStatus === "started" &&
          props.blTimelineEvent.length === 0 && <ListSkeleton />}
        {props.blTimelineEvent.map((item: any) =>
          item.events.length > 0 && (
            item.events.map((el: any, index: number) => (
              <div className="d-flex align-items-center atb-row" key={index}>
                {/* <div className="align-self-start me-3"><img src={el.course.courseimage} alt="" /></div> */}
                <div className="atb-info">
                  <h6>
                    <a href={el.viewurl}>
                      {props.formatDynamicTimestamp(el.timesort)}
                    </a>
                  </h6>
                  {/* <div
                    dangerouslySetInnerHTML={{ __html: el.formattedtime }}
                  ></div> */}
                  <p>{el.name}</p>
                  <p>{props.getTimetableTime(el.timestart)}</p>
                </div>
                <Link
                  to={el.action.url}
                  className="btn btn-light btn-sm atb-button"
                >
                  {el.action.name}
                </Link>
              </div>
            ))
          ) 
          // : (
          //   <Errordiv msg="No record found!" cstate className="" />
          // )
        )}
      </div>
    </div>
  );
};

export default Mobile;
