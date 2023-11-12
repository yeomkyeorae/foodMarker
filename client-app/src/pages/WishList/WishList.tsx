import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { readWishList } from '../../_actions/wishList_action';
import WishListItem from './WishListItem';
import { WishListType } from '../../interfaces/WishList';
import LoadingOverlayDiv from '../../components/loadingOverlay/LoadingOverlay';
import { WishListOrder } from '../../library/def';
import * as S from './WishList.style';
import { useAuthContext } from '../../context/auth';

function WishList(): React.ReactElement {
  const dispatch = useDispatch<any>();
  const [wishLists, setWishLists] = useState<WishListType[]>([]);
  const [order, setOrder] = useState(WishListOrder.enrollAsc);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState<boolean>(false);

  const user = useAuthContext();
  const userId = user.userId as string;

  useEffect(() => {
    dispatch(readWishList(userId, order)).then((response) => {
      setWishLists(response.payload);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const onSetOrderHandler = (value) => {
    setOrder(value);
  };

  return (
    <div style={{ display: 'inline-block', width: '100%' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <S.SortMenu
          onClick={() =>
            onSetOrderHandler(order === WishListOrder.enrollAsc ? WishListOrder.enrollDesc : WishListOrder.enrollAsc)
          }
          color={`${order === WishListOrder.enrollAsc || order === WishListOrder.enrollDesc}`}
        >
          {order === WishListOrder.enrollAsc
            ? '등록 날짜 순↑'
            : order === WishListOrder.enrollDesc
            ? '등록 날짜 순↓'
            : '등록 날짜 순↑'}
        </S.SortMenu>
        <S.SortMenu
          onClick={() =>
            onSetOrderHandler(order === WishListOrder.NameAsc ? WishListOrder.NameDesc : WishListOrder.NameAsc)
          }
          color={`${order === WishListOrder.NameAsc || order === WishListOrder.NameDesc}`}
        >
          {order === WishListOrder.NameAsc
            ? '식당 이름 오름차순↑'
            : order === WishListOrder.NameDesc
            ? '식당 이름 내림차순↓'
            : '식당 이름 오름차순↑'}
        </S.SortMenu>
      </div>
      <S.WishLists>
        {wishLists.length > 0 ? (
          <S.List>
            {wishLists.map((wishList) => (
              <WishListItem
                key={wishList._id}
                wishListId={wishList._id}
                wishListName={wishList.name}
                wishListAddress={wishList.address}
                wishListCreated={wishList.created}
                wishLists={wishLists}
                setWishLists={setWishLists}
                setShowLoadingOverlay={setShowLoadingOverlay}
              />
            ))}
          </S.List>
        ) : (
          <div>등록된 위시리스트 맛집이 없습니다!</div>
        )}
      </S.WishLists>
      <LoadingOverlayDiv showOverlay={showLoadingOverlay} />
    </div>
  );
}

export default withRouter(WishList);
