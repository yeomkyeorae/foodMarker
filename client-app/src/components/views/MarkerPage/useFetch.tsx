import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";
import {
    readRestaurants,
} from "../../../_actions/restaurant_action";


const ITEMPERPAGE = 4;

function useFetch(page, order) {
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [restaurantList, setRestaurantList] = useState([]);

    const sendQuery = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);

            const body = {
                id: window.sessionStorage.getItem("userId"),
                page: page,
                itemPerPage: ITEMPERPAGE,
                order: order
            };
            
            const newRestaurantList = (await dispatch(readRestaurants(body))).payload;
            console.log('newRestaurantList', newRestaurantList);
            
            setRestaurantList(newRestaurantList);
        } catch(err) {
            setError(false);
        }
    }, [page, order]);

    useEffect(() => {
        sendQuery();
    }, [sendQuery, page]);

    return { loading, error, restaurantList }
}

export default useFetch;