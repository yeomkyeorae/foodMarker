import React from "react";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from "moment";
import "moment/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";


function MyCalendar(props) {
	const { restaurants } = props;

	const events = restaurants.map((el, index) => {
		return {
			id: index,
			title: el.name,
			allDay: true,
			start: new Date(el.date),
			end: new Date(el.date)
		}
	});

	moment.locale("ko");
	const localizer = momentLocalizer(moment);

	return (
		<div style={{height: "500px"}}>
			<Calendar 
				localizer={localizer} 
				step={60}
				views={['month']}
				defaultView={Views.MONTH}
				events={events}
			/>
		</div>
	)
}

export default MyCalendar;