import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { useDispatch } from "react-redux";
import {
    readRestaurants,
} from "../../../_actions/restaurant_action";
import { ItemPerPage } from '../../../library/def';
import { RestaurantDetail } from '../../interfaces/Restaurant';


function useFetch(page: number, totalItemCount: number): { loading: boolean, error: boolean, restaurantList: RestaurantDetail[], setRestaurantList: Dispatch<SetStateAction<any>> } {
    const dispatch = useDispatch<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [restaurantList, setRestaurantList] = useState([]);

    const sendQuery = useCallback(async (totalItemCount) => {
        try {
            const maxPage = totalItemCount % ItemPerPage === 0 ? Math.floor(totalItemCount / ItemPerPage) : Math.floor(totalItemCount / ItemPerPage) + 1;

            if (maxPage !== 0 && maxPage < page) {
                setLoading(false);
                setError(true);
            } else {
                setLoading(true);
                setError(false);

                const userId = window.sessionStorage.getItem("userId") as string;

                if (Math.ceil(restaurantList.length / totalItemCount) < page) {
                    const newRestaurantList = (await dispatch(readRestaurants(userId, page, ItemPerPage))).payload;

                    if (!newRestaurantList.length) {
                        setLoading(false);
                        setError(true);
                    } else {
                        setRestaurantList(restaurantList => restaurantList.concat(newRestaurantList));
                    }
                }
            }
        } catch (err) {
            setError(false);
        }
    }, [page]);

    useEffect(() => {
        sendQuery(totalItemCount);
    }, [sendQuery, page, totalItemCount]);

    return { loading, error, restaurantList, setRestaurantList }
}

export default useFetch;