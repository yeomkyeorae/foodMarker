import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";
import {
    readRestaurants,
} from "../../../_actions/restaurant_action";
import { itemPerPage } from '../../../library/def';
import { RestaurantType } from '../../interfaces/Restaurant';


function useFetch(page: number, order: number, totalItemCount: number): { loading: boolean, error: boolean, restaurantList: RestaurantType[] } {
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [restaurantList, setRestaurantList] = useState([]);

    const sendQuery = useCallback(async (totalItemCount) => {
        try {
            const maxPage = totalItemCount % itemPerPage === 0 ? Math.floor(totalItemCount / itemPerPage) : Math.floor(totalItemCount / itemPerPage) + 1;

            if(maxPage !== 0 && maxPage < page) {
                setLoading(false);
                setError(true);
            } else {
                setLoading(true);
                setError(false);

                const body = {
                    id: window.sessionStorage.getItem("userId"),
                    page: page,
                    itemPerPage: itemPerPage,
                    order: order
                };

                if(Math.ceil(restaurantList.length / totalItemCount) < page) {
                    const newRestaurantList = (await dispatch(readRestaurants(body))).payload;
    
                    if(!newRestaurantList.length) {
                        setLoading(false);
                        setError(true);
                    } else {
                        setRestaurantList(restaurantList => restaurantList.concat(newRestaurantList));
                    }
                }
            }
        } catch(err) {
            setError(false);
        }
    }, [page, order]);

    useEffect(() => {
        sendQuery(totalItemCount);
    }, [sendQuery, page, totalItemCount]);

    return { loading, error, restaurantList }
}

export default useFetch;