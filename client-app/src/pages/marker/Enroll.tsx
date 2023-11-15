import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { registerRestaurant, registerJpegImg, registerHeicImg } from '../../_actions/restaurant_action';
import { registerWishList } from '../../_actions/wishList_action';
import MapForEnroll from '../../components/kakaoMap/MapForEnroll';
import { Button } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import AlertModal from '../../components/alert/AlertModal';
import LoadingOverlayDiv from '../../components/loadingOverlay/LoadingOverlay';
import ImageInput from '../../components/input/ImageInput';
import TextInput from '../../components/input/TextInput';
import { useAuthContext } from '../../context/auth';
import * as S from './Enroll.style';

interface Props extends RouteComponentProps {
  parentCompName: string;
  setToggle: Dispatch<SetStateAction<boolean>>;
  setMenu: Dispatch<SetStateAction<string>>;
  history: RouteComponentProps['history'];
}

function Enroll({ parentCompName, setToggle, setMenu, history }: Props): React.ReactElement {
  // Input 관련 state
  const [name, setName] = useState('');
  const [searchName, setSearchName] = useState('을지로3가');
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState(0);
  const [visitedDate, setVisitedDate] = useState('');
  const [eatingTime, setEatingTime] = useState(1);
  const [newMenuItem, setNewMenuItem] = useState('');
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [starSize, setStarSize] = useState(window.innerWidth / 25);

  useEffect(() => {
    function handleSize() {
      setStarSize(Math.round(window.innerWidth / 25));
    }

    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  // JPEG 이미지
  const [jpegImageData, setJpegImageData] = useState<any>([]);
  const [jpegCount, setJpegCount] = useState(0);

  // HEIC 이미지
  const [heicImageData, setHeicImageData] = useState<any[]>([]);
  const [heicImageName, setHeicImageName] = useState<any[]>([]);
  const [heicCount, setHeicCount] = useState(0);

  // PreImages
  const [preImages, setPreImages] = useState<any[]>([]);
  const [representImageIx, setRepresentImageIx] = useState<number>(0);

  // HEIC 변환 중 여부
  const [isConverting, setIsConverting] = useState(false);

  // Toggle
  const [enrollToggle, setEnrollToggle] = useState(true);

  // alert
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // 맛집 등록 오버레이
  const [showLoadingOverlay, setShowLoadingOverlay] = useState<boolean>(false);

  // user context
  const { userId, userName } = useAuthContext();

  const dispatch = useDispatch<any>();
  const searchInputRef: React.RefObject<any> = useRef();
  const fileInputRef: React.RefObject<any> = useRef();
  const menuInputRef: React.RefObject<any> = useRef();
  const menuAddBtnRef: React.RefObject<any> = useRef();

  // Handlers
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  };

  const onChangeSearchNameHandler = (e) => {
    setSearchName(e.currentTarget.value);
  };

  const onAddressHandler = (e) => {
    setAddress(e.currentTarget.value);
  };

  const onRatingHandler = (newRating) => {
    setRating(newRating);
  };

  const onVisitedDateHandler = (e) => {
    setVisitedDate(String(e.currentTarget.value));
  };

  const onEatingTimeHandler = (e) => {
    setEatingTime(parseInt(e.target.value));
  };

  const onChangeNewMenuItem = (e) => {
    setNewMenuItem(e.currentTarget.value);
  };

  const onMenuAddHandler = () => {
    if (newMenuItem !== '') {
      setMenuItems(menuItems.concat([newMenuItem]));
      setNewMenuItem('');
    }
  };

  const onMenuDeleteHandler = (index) => {
    setMenuItems(menuItems.filter((menu, menuIx) => menuIx !== index));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (name.length === 0 || address.length === 0) {
      setAlertToggle(true);
      setAlertMessage('식당을 검색해서 선택해 주세요!');
      return;
    }

    // 나의 맛집
    if (parentCompName === 'MarkerPage') {
      if (visitedDate.length === 0) {
        setAlertToggle(true);
        setAlertMessage('방문 날짜를 입력해주세요!');
        return;
      }

      if (rating === 0) {
        setAlertToggle(true);
        setAlertMessage('별점을 입력해 주세요!');
        return;
      }

      // JPEG 저장
      let jpegPath = [];
      if (jpegCount) {
        const response = await dispatch(registerJpegImg(jpegImageData));
        jpegPath = response.payload.fileNames;
      }

      // HEIC 저장
      let heicPath = [];
      if (heicCount) {
        const heicBody = {
          images: heicImageData,
          imgNames: heicImageName,
        };
        const response = await dispatch(registerHeicImg(heicBody));
        heicPath = response.payload.fileNames;
      }

      const imagePath = jpegPath.concat(heicPath).join(',');

      const body = {
        visitor: userId as string,
        username: userName as string,
        name: name,
        address: address,
        date: visitedDate,
        imgURL: imagePath,
        rating: rating,
        eatingTime: eatingTime,
        menus: JSON.stringify(menuItems),
        created: new Date().toISOString(),
        representIx: representImageIx,
      };

      setShowLoadingOverlay(true);

      dispatch(registerRestaurant(body))
        .then((response) => {
          if (response.payload.success) {
            setName('');
            setAddress('');
            setVisitedDate('');
            setRating(0);
            setEatingTime(1);
            setMenuItems([]);

            setShowLoadingOverlay(false);
            setAlertToggle(true);
            setAlertMessage('맛집 등록에 성공했습니다');

            setMenu('식당 등록');
            history.push('/marker', userId);
          }
        })
        .catch((err) => {
          setShowLoadingOverlay(false);
          setAlertToggle(true);
          setAlertMessage('맛집 등록에 실패했습니다');
          console.log(err);
        });
    } else if (parentCompName === 'WishPage') {
      // 위시 맛집
      const body = {
        user: userId as string,
        username: userName as string,
        name: name,
        address: address,
        created: new Date().toISOString(),
      };
      dispatch(registerWishList(body))
        .then((response) => {
          if (response.payload.success) {
            setName('');
            setAddress('');

            setAlertToggle(true);
            setAlertMessage('위시 리스트 등록에 성공했습니다');

            setMenu('위시리스트 등록');
            history.push('/wish', userId);
          }
        })
        .catch((err) => {
          setAlertToggle(true);
          setAlertMessage('위시 리스트 등록에 실패했습니다');
          console.log(err);
        });
    }
  };

  const toggleHandler = () => {
    setEnrollToggle(!enrollToggle);
  };

  const onSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      searchInputRef.current.focus();
      toggleHandler();
    }
  };

  const onMenuAddKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      if (newMenuItem !== '') {
        menuAddBtnRef.current.focus();
        onMenuAddHandler();
      }
    }
  };

  const initAllImages = () => {
    fileInputRef.current.value = '';

    setJpegImageData([]);
    setJpegCount(0);

    setHeicImageData([]);
    setHeicImageName([]);
    setHeicCount(0);

    setPreImages([]);
    setRepresentImageIx(0);
  };

  return (
    <div>
      <div id={`menu_wrap`} className='bg_white' style={{ display: 'inline-block', width: '90%' }}>
        <div>
          <S.InputTitle fontSize={'1.5rem'} borderBottom={'2px'}>
            맛집 검색
          </S.InputTitle>
          <TextInput
            value={searchName}
            placeholder={''}
            onChange={onChangeSearchNameHandler}
            id={`keyword`}
            onKeyPress={onSearchKeyPress}
          />
          <Button
            variant='success'
            style={{ margin: '10px' }}
            type='submit'
            onClick={toggleHandler}
            ref={searchInputRef}
          >
            검색
          </Button>
        </div>
        <MapForEnroll toggle={enrollToggle} setName={setName} setAddress={setAddress} width={'50%'} />
        <ul
          id={`placesList`}
          style={{
            listStyle: 'none',
            height: '300px',
            minWidth: '500px',
            maxWidth: '700px',
            display: 'inline-block',
            overflowY: 'scroll',
            padding: '0px',
          }}
        ></ul>
        <div id={`pagination`}></div>
      </div>
      <hr />

      <form
        onSubmit={onSubmitHandler}
        onKeyPress={(e) => {
          e.key === 'Enter' && e.preventDefault();
        }}
        encType='multipart/form-data'
      >
        <div style={{ margin: '5px' }}>
          <S.InputTitle>맛집 이름 & 주소(검색해 선택해 주세요)</S.InputTitle>
          <TextInput value={name} placeholder='맛집 이름' onChange={onNameHandler} readOnly />
        </div>
        <div style={{ margin: '5px' }}>
          <TextInput value={address} placeholder='맛집 주소' onChange={onAddressHandler} readOnly={true} />
        </div>
        {parentCompName === 'MarkerPage' ? (
          <>
            <div
              style={{
                margin: '5px',
              }}
            >
              <S.InputTitle>별점</S.InputTitle>
              <div style={{ display: 'inline-block' }}>
                <ReactStars
                  count={5}
                  value={rating}
                  onChange={onRatingHandler}
                  size={starSize}
                  isHalf={true}
                  activeColor='#ffd700'
                />
              </div>
            </div>

            <div style={{ margin: '5px' }}>
              <S.InputTitle>방문 일시</S.InputTitle>
              <input
                type='date'
                value={visitedDate}
                placeholder='방문 일시'
                onChange={(e) => onVisitedDateHandler(e)}
              />
              <select
                id='select'
                value={eatingTime}
                style={{ marginLeft: '5px' }}
                onChange={(e) => onEatingTimeHandler(e)}
              >
                <option value='1'>아침</option>
                <option value='2'>점심</option>
                <option value='3'>저녁</option>
                <option value='4'>기타</option>
              </select>
            </div>

            <div>
              <div style={{ margin: '5px' }}>
                <S.InputTitle>메뉴</S.InputTitle>
                <TextInput
                  value={newMenuItem}
                  placeholder='메뉴 입력 버튼 클릭'
                  onChange={(e) => onChangeNewMenuItem(e)}
                  onKeyPress={onMenuAddKeyPress}
                  ref={menuInputRef}
                />
                <br />
                <Button
                  variant='success'
                  style={{ margin: '10px', display: 'inline-block' }}
                  onClick={() => onMenuAddHandler()}
                  onKeyPress={() => menuInputRef.current.focus()}
                  ref={menuAddBtnRef}
                >
                  메뉴 추가
                </Button>
              </div>
            </div>
            {menuItems.length
              ? menuItems.map((menu, index) => (
                  <div key={index} style={{ marginTop: '2px' }}>
                    {menu}
                    <Button variant='danger' style={{ marginLeft: '10px' }} onClick={() => onMenuDeleteHandler(index)}>
                      X
                    </Button>
                  </div>
                ))
              : null}

            <div style={{ margin: '5px' }}>
              <S.InputTitle>이미지 업로드</S.InputTitle>
              <div style={{ display: 'inline-block' }}>
                <ImageInput
                  style={{ width: '70%' }}
                  inputRef={fileInputRef}
                  setAlertToggle={setAlertToggle}
                  setAlertMessage={setAlertMessage}
                  setIsConverting={setIsConverting}
                  setHeicImageData={setHeicImageData}
                  setHeicImageName={setHeicImageName}
                  setHeicCount={setHeicCount}
                  setJpegImageData={setJpegImageData}
                  setJpegCount={setJpegCount}
                  setPreImages={setPreImages}
                />
              </div>
              {preImages.length > 0 && isConverting === false ? (
                <div style={{ marginTop: '10px' }}>
                  <Button variant='danger' onClick={() => initAllImages()}>
                    초기화
                  </Button>
                </div>
              ) : null}
              <div style={{ marginTop: '10px' }}>
                {preImages.length > 0
                  ? preImages.map((preImage, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: 'inline-block',
                            margin: '5px',
                            cursor: 'pointer',
                            border: `${index === representImageIx ? '5px solid red' : '0px'}`,
                          }}
                          onClick={() => setRepresentImageIx(index)}
                        >
                          <img src={preImage} alt={'jpeg'} width='100px' height='100px' />
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </>
        ) : null}
        <div>
          <hr />
          <Button
            variant={isConverting ? 'danger' : 'primary'}
            style={{ margin: '20px', width: '15%' }}
            type='submit'
            disabled={isConverting ? true : false}
          >
            {isConverting ? '이미지 변환 중' : '등록'}
          </Button>
        </div>
      </form>
      {alertToggle ? (
        <AlertModal setAlertToggle={setAlertToggle} alertMessage={alertMessage} setToggle={setToggle} />
      ) : null}
      <LoadingOverlayDiv showOverlay={showLoadingOverlay} />
    </div>
  );
}

export default withRouter(Enroll);
