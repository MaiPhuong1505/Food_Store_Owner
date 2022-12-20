import React, { useState, useEffect, useRef } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone';
import theme from '../../theme';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";

const UploadImage = ({ OwnerID, fileName, getData, height, width = '100%', selectedURL = '' }) => {
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  const [image, setImage] = useState({ name: "Hãy chọn file" })
  const [imageUrl, setImageUrl] = useState(selectedURL)

  const uploadFile = (img) => {
    if (img == null) return;
    if (fileName != img.name || fileName == '') { fileName = img.name }
    const imageRef = ref(storage, `${OwnerID}/${OwnerID} - ${fileName}`);
    uploadBytes(imageRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        getData(url);
        setImageUrl(url)
      });
    });
  };

  useEffect(() => {
    if (selectedURL != imageUrl) {
      setImageUrl(selectedURL)
    }
  }, [selectedURL])

  return (
    <>
      <Dropzone
      >
        {({ getRootProps, getInputProps }) => (
          <>
            <div {...getRootProps()}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px dashed',
                borderColor: theme.palette.primary.main,
                width: 'inherit',
                height: 'fit-content'
              }}>
                <input {...getInputProps()}
                  onChange={(e) => {
                    setImage(e.target.files[0])
                    uploadFile(e.target.files[0])
                  }}
                  accept="image/*"
                />
                {imageUrl !== '' ?
                  <img style={{ width: '-webkit-fill-available' }} src={imageUrl} /> :
                  <AddPhotoAlternateOutlinedIcon
                    sx={{ color: theme.palette.primary.main, margin: `calc(${height}/2.5)` }}
                    fontSize='large' />
                }
              </div>

            </div>
            <aside>
              <p>{image.name}</p>
            </aside>
          </>
        )}
      </Dropzone>
    </>
  )
}

export default UploadImage
