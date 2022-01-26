import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ImgixClient from '@imgix/js-core';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const client = new ImgixClient({
  domain: 'assets.imgix.net',
});

export default function BottomBar(props) {
  const MAX_IMAGE_SIZE = 1000000
  const [link, setlink] = useState(props.linkImage);
  const [image, setImage] = useState('');
  const [nameImage, setnameImage] = useState('');
  const [uploadURL, setUploadURL] = useState('');
  const [open, setOpen] = React.useState(false);


  function clickHistory(value) {
    props.handleHistory(value);
  }


  const handleFileInput = async (e) => {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    createImage(files[0])
  }

  function createImage(file) {
    let reader = new FileReader()
    reader.onload = (e) => {

      if (!e.target.result.includes('data:image/jpeg')) {
        return alert('Wrong file type - JPG only.')
      }
      if (e.target.result.length > MAX_IMAGE_SIZE) {
        return alert('Image is loo large.')
      }
      setImage(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  async function uploadImage(e) {
    setOpen(!open);
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://6kv7b0hkd2.execute-api.us-east-1.amazonaws.com/uploads'
      })

      const name = response.Key
      setnameImage(name)
      let binary = atob(image.split(',')[1])
      let array = []
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      let blobData = new Blob([new Uint8Array(array)], { type: 'image/jpeg' })
      const result = await fetch(response.uploadURL, {
        method: 'PUT',
        body: blobData
      })
      // Final URL for the user doesn't need the query string params
      setUploadURL(response.uploadURL.split('?')[0])

      const urlImageFinal = `http://nanlabs.imgix.net/${name}`
      props.handleNewImage(urlImageFinal)
      setOpen(false);
    }
    catch (error) {
      console.error(error);
      setOpen(false);
    }
  }
  return (
    <Grid container direction="row" className="bottom-bar"
      justifyContent="space-between"
      alignItems="center">
      <Grid
        xs={2}
        item
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={8}>
          <h5 style={{ fontSize: 11 }}>You own images</h5>
          <input type="file" accept="image/jpeg" onChange={handleFileInput} />
        </Grid>
        <Grid item xs={3}>
          <button
            className="button-download"
            style={{ margin: 0, width: '92px', fontSize: 12 }}
            onClick={() => uploadImage()}
            disabled={!image}
          >
            Upload image
          </button>
        </Grid>
      </Grid>
      <Grid
        item
        xs={6}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <button
          className="button-history"
          onClick={() => clickHistory("deshacer")}
          disabled={props.placeInHistory === 0}
        >
          Deshacer
          <img src="https://pixlr.com/img/icon/undo-small.svg"  width="16" height="16"></img>
        </button>
        <button
          className="button-history"
          style={{ margin: 0, width: '92px' }}
          onClick={() => clickHistory("rehacer")}
          disabled={props.placeInHistory >= props.length - 1}
        >
          <img src="https://pixlr.com/img/icon/redo-small.svg"  width="16" height="16"></img>
          Rehacer
        </button>
      </Grid>
      <Grid
        item
        xs={3}
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <textarea readOnly={true} value={props.linkImage} >{props.linkImage}</textarea>
        <a
          className="button-download"
          target="_blank"
          href={props.linkImage}
        >
          Descargar
        </a>
      </Grid>
    </Grid>
  );
}
