import heic2any from "heic2any";
import { InputImageLimit } from "../../../library/def";


const onImageDataHandler = (e, props) => {
  e.preventDefault();

  const { setAlertToggle, setAlertMessage, setIsConverting,
    setHeicImageData, setHeicImageName, setHeicCount,
    setJpegImageData, setJpegCount, setPreImages } = props;

  const files = e.target.files;

  const inputImageCnt = Object.keys(files).length;
  if (inputImageCnt > InputImageLimit) {
    setAlertToggle(true);
    setAlertMessage(`이미지 파일은 ${InputImageLimit}개를 초과할 수 없습니다`);
    return;
  }

  let heicTotalCnt = 0;
  let jpegTotalCnt = 0;

  Object.keys(files).forEach(key => {
    if (files[key].type === "image/heic") {
      heicTotalCnt += 1;
    } else {
      jpegTotalCnt += 1;
    }
  });

  setIsConverting(true);

  // JPEG 관련 변수
  const formData = new FormData();
  const jpegPreImages: any[] = [];

  // HEIC 관련 변수
  const imageData: any[] = [];
  const imageNames: any[] = [];
  const heicPreImages: any[] = [];

  let jpegCnt = 0;
  let heicCnt = 0;
  Object.keys(files).forEach((key) => {
    const file = files[key];

    if (file.type === "image/heic") {
      const reader = new FileReader();

      reader.onloadend = function () {
        const image = reader.result as string;

        fetch(image)
          .then(res => res.blob())
          .then(blob =>
            heic2any({ blob, toType: "image/jpeg", quality: 0.7 })
          )
          .then(conversionResult => {
            // heic type 제거한 imageName
            const splited = file.name.split(".");
            const removedType = splited.slice(0, splited.length - 1);
            const newImageName = removedType.join("");

            const fileReader = new FileReader();
            fileReader.onload = (e: any) => {
              heicCnt += 1;
              heicPreImages.push(e.target.result);
              imageData.push(e.target.result);
              imageNames.push(newImageName);

              if (heicCnt === heicTotalCnt) {
                setHeicImageData(imageData);
                setHeicImageName(imageNames);
                setHeicCount(heicCnt);

                setPreImages(preImages => preImages.concat(heicPreImages));
                setIsConverting(false);
              }
            };
            fileReader.readAsDataURL(conversionResult as Blob);
          })
          .catch(err => {
            setAlertToggle(true);
            setAlertMessage("HEIC 이미지 파일 변환에 실패했습니다");
            console.log(err);
          });
      };
      reader.readAsDataURL(file);
    } else {
      formData.append("restaurant_jpeg_img", file);
      const reader = new FileReader();
      reader.onload = () => {
        jpegCnt += 1;
        jpegPreImages.push(reader.result);

        if (jpegCnt === jpegTotalCnt) {
          setJpegCount(jpegCnt);
          setPreImages(preImages => preImages.concat(jpegPreImages));
        }
        if (heicTotalCnt === 0) {
          setIsConverting(false);
        }
      };
      reader.readAsDataURL(file);
    }
  });
  setJpegImageData(formData);
}

const ImageInput = (props) => {
  const { inputRef } = props;

  return (
    <input
      type="file"
      ref={inputRef}
      onChange={e => onImageDataHandler(e, props)}
      style={{ width: "70%" }}
      multiple
    />
  )
}

export default ImageInput;