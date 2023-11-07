import FilterDropdown from "../../filterDropdown";
import Errordiv from "../../../../../../../widgets/alert/errordiv";
import ListSkeleton from "../../../../../../../widgets/skeleton/list";

type Props = {
  apiStatus: string;
  eventsPacket: any;
  showAlert: boolean;
  getTimetableTime: any;
  formatDynamicTimestamp: any;
};

const Mobile: React.FC<Props> = (props) => {
  return (
    <div className="mitblock activityTimeline-block">
      <h3 className="mitblock-title">Activity Timeline</h3>
      <FilterDropdown eventsPacket={props.eventsPacket} />
      <div className="mitblock-body">
        {props.eventsPacket.length > 0 &&
          props.eventsPacket.map((event: any, index: number) => (
            <div className="d-flex align-items-center atb-row" key={index}>
              {/* <div className="align-self-start me-3"><img src={el.course.courseimage} alt="" /></div> */}
              <div className="atb-info">
                <h6>
                  <a href={event.viewurl}>
                    {props.formatDynamicTimestamp(event.timesort)}
                  </a>
                </h6>
                {/* <div
                    dangerouslySetInnerHTML={{ __html: event.formattedtime }}
                  ></div> */}
                <h6>
                  {event.activityname.charAt(0).toUpperCase() +
                    event.activityname.slice(1)}
                </h6>
                <p>
                  {event.course.fullname}.
                  {event.name.charAt(0).toUpperCase() + event.name.slice(1)}.{" "}
                </p>
                <p>{props.getTimetableTime(event.timestart)}</p>
              </div>
              <a
                href={event.action.url}
                className="btn btn-light btn-sm atb-button"
              >
                {event.action.name}
              </a>
            </div>
          ))}

        {props.apiStatus === "started" && props.eventsPacket.length === 0 && (
          <ListSkeleton />
        )}
        {props.apiStatus === "finished" &&
          props.eventsPacket.length === 0 &&
          props.showAlert !== false && (
            <Errordiv msg="No record found!" cstate className="" />
          )}
      </div>
    </div>
  );
};

export default Mobile;
