import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from "moment";
import "moment/locale/ko";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { RestaurantDetail } from '../../interfaces/Restaurant';
import RestaurantItemModal from "../../containers/RestaurantItemModal/RestaurantItemModal";
import noImage from "../../../assets/noImage.jpeg";


type MyCalendarProps = {
	restaurants: RestaurantDetail[];
};

function MyCalendar({ restaurants }: MyCalendarProps): React.ReactElement {
	const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null);
	const [imgUrls, setImgUrls] = useState<string[]>([]);
	const [toggle, setToggle] = useState(false);

	const getRepresentativeImage = useCallback((restaurant) => {
		// TODO: 설정한 대표 이미지 가져오기
		let imgUrls: string[] = [];
		if (restaurant.imgURL) {
			imgUrls = restaurant.imgURL.split(",");
		} else {
			imgUrls.push(noImage);
		}
		return imgUrls;
	}, []);

	const events = restaurants.map((el, index) => {
		return {
			id: index,
			title: el.name,
			allDay: true,
			start: new Date(el.date),
			end: new Date(el.date),
			rating: el.rating,
			restaurantId: el._id,
			restaurant: el
		}
	});

	moment.locale("ko");
	const localizer = momentLocalizer(moment);

	return (
		<div style={{ height: "500px" }}>
			<Calendar
				localizer={localizer}
				step={60}
				views={['month']}
				defaultView={Views.MONTH}
				onSelectEvent={(event) => {
					setRestaurant(event.restaurant);
					setImgUrls(getRepresentativeImage(event.restaurant));
					setToggle(true);
				}}
				events={events}
				eventPropGetter={(event) => {
					const newStyle = {
						color: 'white',
						backgroundColor: 'gray'
					};

					if (event.rating === 5) {
						newStyle.backgroundColor = "gold"
					} else if (event.rating >= 4) {
						newStyle.backgroundColor = "#8bc34a"
					} else if (event.rating >= 3) {
						newStyle.backgroundColor = "#35baf6"
					} else if (event.rating >= 2) {
						newStyle.backgroundColor = "#ed4b82"
					}

					return {
						style: newStyle
					};
				}
				}
			/>
			{
				toggle && restaurant ? (
					<RestaurantItemModal
						toggle={toggle}
						setToggle={setToggle}
						restaurant={restaurant}
						restaurantImgUrls={imgUrls}
						restaurantList={restaurants}
						readOnly={true}
					/>
				) : null
			}
		</div>
	)
}

export default MyCalendar;