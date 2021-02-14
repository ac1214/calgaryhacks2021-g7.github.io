import React, { useState, useEffect, useRef, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button, Dialog } from "@material-ui/core";
import "./Calendar.css";
import SubjectOptions from "./SubjectOptions";
import { AuthContext } from "../../context/auth-context";

let valid_slots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function tConvert(time) {
    if (time < 12) {
        return time.toString() + "AM"
    }
    else if (time === 12) {
        return time.toString() + "PM"
    }
    else {
        return (time - 12).toString() + "PM"
    }
}

export default function Calendar() {
    const { user } = useContext(AuthContext);
    // const [chosenTime, setChosenTime] = useState({
    //     date: null,
    //     dateString: "",
    //     subject: "Datastructures and Algorithms"
    // });
    const [date, setDate] = React.useState(null);
    const [datestring, setDateString] = useState(null);
    const [subject, setSubject] = useState("");  
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const subHandleModalClose = (subject) => {
        setSubject(subject)
        setModalOpen(false);
        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify({
                "user_id": user.uid,
                "meeting_time": date,
                "course": subject
            })
        };

        async function fetchMyAPI() {
            let response = await fetch("https://operating-land-304706.wm.r.appspot.com/schedule_session", requestOptions)
            response = await response.json()
            console.log(response)
            return response
        }

        fetchMyAPI()
    }

    const handleModalClose = () => {
        setModalOpen(false);
        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify({
                "user_id": user.uid,
                "meeting_time": date,
                "course": subject
            })
        };

        async function fetchMyAPI() {
            let response = await fetch("https://operating-land-304706.wm.r.appspot.com/schedule_session", requestOptions)
            response = await response.json()
            console.log(response)
            return response
        }

        fetchMyAPI()

    }

    const handleEventClick = (event) => {
        const eventDate = event.event.start;
        let month = monthNames[eventDate.getMonth()];
        let day = eventDate.getDate().toString();
        let hour = tConvert(eventDate.getHours());
        let completeTime = month + ' ' + day + ' @ ' + hour;
        setDate(eventDate);
        setDateString(completeTime);

        handleModalOpen();
    }

    return (
        <div className="booking">
            <FullCalendar
                initialView="timeGridWeek"
                header={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                selectable={true}
                handleWindowResize={true}
                allDaySlot={false}
                slotDuration="01:00:00"
                slotMinTime="08:00:00"
                slotMaxTime="21:00:00"
                expandRows={true}
                eventClick={handleEventClick}
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit'
                }}
                displayEventEnd={false}
                events={valid_slots.map(elem => {
                    return {
                        groupId: 'blueEvents', // recurrent events in this group move together
                        daysOfWeek: ['0', '1', '2', '3', '4', '5', '6'],
                        startTime: elem.toString() + ':00:00',
                        endTime: (elem + 1).toString() + ':00:00'
                    }
                })}
                editable={true}
            />
            <Dialog
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <SubjectOptions currDate={datestring} subhandlemodalclose={subHandleModalClose} />
            </Dialog>
        </div>
    )
}