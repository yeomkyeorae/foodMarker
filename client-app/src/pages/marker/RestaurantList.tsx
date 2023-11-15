import { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { readRestaurantsCount } from '../../_actions/restaurant_action';
import RestaurantListItem from './RestaurantListItem';
import { Row } from 'react-bootstrap';
import useFetch from './useFetch';
import { useAuthContext } from '../../context/auth';
import * as S from './RestaurantList.style';

function RestaurantList(): React.ReactElement {
  const dispatch = useDispatch<any>();
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [page, setPage] = useState(1);

  const { loading, error, restaurantList, setRestaurantList } = useFetch(page, totalItemCount);
  const loader = useRef(null);

  const { userId } = useAuthContext();

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];

      if (target.isIntersecting) {
        setPage((page) => page + 1);
      }
    },
    [totalItemCount, setTotalItemCount],
  );

  useEffect(() => {
    dispatch(readRestaurantsCount(userId as string)).then((response) => {
      if (response.payload?.success === false) {
        setTotalItemCount(0);
      } else {
        setTotalItemCount(response.payload);
      }
    });

    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1,
    };

    if (totalItemCount > 0) {
      const observer = new IntersectionObserver(handleObserver, option);
      if (loader.current) observer.observe(loader.current);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItemCount]);

  return (
    <div style={{ display: 'inline-block', width: '100%' }}>
      <S.Div>
        <S.Restaurants>
          <S.List>
            <Row className='show-grid'>
              {restaurantList.map((restaurant, index) => (
                <RestaurantListItem
                  key={'restaurantListItem' + index}
                  restaurant={restaurant}
                  restaurantList={restaurantList}
                  setRestaurantList={setRestaurantList}
                ></RestaurantListItem>
              ))}
            </Row>
          </S.List>
        </S.Restaurants>
        {loading && <p>Loading...</p>}
        {error && <p>페이지 끝입니다!</p>}
        <div ref={loader} />
      </S.Div>
    </div>
  );
}

export default withRouter(RestaurantList);
