import Filters from "./filter";
import Header from "../../../newHeader";
import Footer from "../../../newFooter";
import WeeklyTimetable from "./weekTable";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import HeaderTabs from "../../../headerTabs";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import PageTitle from "../../../../widgets/pageTitle";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";

const WeeklyDraftVersion = () => {
    const location = useLocation();
    const dummyData = {
        items: [],
        pager: { totalElements: 0, totalPages: 0 },
    };
    const [urlArg, setUrlArg] = useState({dpt: 0, prg: ''});
    const [departmentTimeslots, setDepartmentTimeslots] = useState(dummyData);
    const currentInstitute = useSelector(
        (state: any) => state.globalFilters.currentInstitute
      );
    const [timeslots, setTimeslots] = useState([]);
    const [apiStatus, setApiStatus] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const dpt = parseInt(urlParams.get('dpt'));
        const prg = urlParams.get('prg');
        setUrlArg({dpt, prg})
    }, []);
    
    useEffect(() => {
        if (urlArg.dpt > 0) {
            let endPoint = `/${currentInstitute}/timetable/timeslot`;
            makeGetDataRequest(
                endPoint,
                {departmentId: urlArg.dpt, pageNumber: 0, pageSize: 100},
                setDepartmentTimeslots,
                setApiStatus
            );
        }
    }, [urlArg.dpt]);

    useEffect(() => {
        if (departmentTimeslots.items.length > 0) {
            let timeslotPacket = [];
            departmentTimeslots.items.map((item) => {
                let currentPacket = {
                    timeSlot: `${item.startTime} - ${item.endTime}`,
                }
                if (item.breakTime === true ) {
                    let breakType = item.type.charAt(0).toUpperCase() + item.type.slice(1) + ' break';
                    currentPacket.monday = breakType;
                    currentPacket.tuesday = breakType;
                    currentPacket.wednesday = breakType;
                    currentPacket.thursday = breakType;
                    currentPacket.friday = breakType;
                    currentPacket.saturday = breakType;
                    currentPacket.sunday = breakType;
                }
                timeslotPacket.push(currentPacket);
            })
            setTimeslots(timeslotPacket);
        }
    }, [departmentTimeslots]);

    return (
        <React.Fragment>
            <Header />
            <HeaderTabs activeTab="siteadmin" />
            <BreadcrumbComponent
                routes={[
                { name: "Site Administration", path: "/siteadmin" },
                { name: "Timetable Management", path: "/timetable" },
                { name: "Draft Version", path: "" },
                ]}
            />
            <div className="contentarea-wrapper mt-3 mb-5">
                <Container fluid>
                    <PageTitle pageTitle={`${urlArg.prg} : Draft Version`} gobacklink="/timetable" />
                    <Filters />
                    <div>
                        <span><b>Start Date:</b> 16/10/2023
                        {/* {format(weekDates[0], 'dd/MM/yyyy')} */}
                        </span>{"  "}
                        <span><b>End Date: </b>  22/10/2023
                        {/* {format(weekDates[6], 'dd/MM/yyyy')} */}
                        </span>
                    </div>
                    {apiStatus === "finished" && timeslots.length > 0 &&
                        <WeeklyTimetable data={timeslots}/> 
                    }
                    {apiStatus === "finished" && timeslots.length === 0 &&
                        <div><i>No timeslots are available</i></div>
                    }
                </Container>
            </div>
            <Footer />
        </React.Fragment>
        
    )
}

export default WeeklyDraftVersion;