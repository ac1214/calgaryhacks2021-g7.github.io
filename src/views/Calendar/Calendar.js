import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';


export default function Calendar () {
    return (
      <FullCalendar
        initialView="timeGridWeek"
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        handleWindowResize={true}
        events={[
          { title: 'event 1', date: '2021-02-13' },
          { title: 'event 2', date: '2021-02-12' }
        ]}
      />
    )
}