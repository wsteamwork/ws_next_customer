import React, { FC, Fragment, useState } from 'react';
import { Grid, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { DropzoneComponent } from 'react-dropzone-component';
interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    Dropzone: {
      backgroundColor: '#f9f9f9',
      border: '1px dashed #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: theme.spacing(4, 5),
      color: '#4e5b69',
      fontWeight: 600,
      borderRadius: 5
    },
    Icon: {
      opacity: 0.3,
      height: '64px',
      width: '64px'
    },
    fileInput: {
      display: 'none'
    },
    separator: {
      position: 'relative',
      marginTop: '1rem',
      marginBottom: '0.5rem',
      '&:after': {
        position: 'absolute',
        content: '',
        height: '1px',
        width: '200px',
        background: '#d8d8d8',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    },
    button: {
      background: '#031629',
      boxShadow: '0 0 2px 0 rgba(3, 22, 41, 0.11), 0 6px 16px 0 rgba(3, 22, 41, 0.08)',
      fontFamily: 'SFProDisplay-Regular',
      fontSize: '14px',
      color: '#ffffff',
      letterSpacing: '0.4px',
      padding: '12px 30px',
      borderRadius: '4px'
    },
    span: {
      position: 'relative',
      background: '#f9f9f9',
      padding: '0 4px',
      zIndex: 9,
      fontSize: '12px',
      color: '#4e5b69'
    }
  })
);

const CustomDropzone: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [dropzone, setDropzone] = useState(null);
  const [images, setImages] = useState([]);

  const ReactDOMServer = require('react-dom/server');
  const config = {
    showFiletypeIcon: false,
    postUrl: 'https://long-term-api.westay.vn/merchant-api/upload-image'
  };
  const djsConfig = {
    addRemoveLinks: false,
    autoProcessQueue: false,
    uploadMultiple: true,
    maxFilesize: 25,
    maxThumbnailFilesize: 50,
    maxFiles: 50,
    headers: { 'My-Awesome-Header': 'header value' },
    paramName: 'file',
    renameFile(file) {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let date = new Date().getDate();
      let timestamp = new Date().getTime();
      let newName =
        `${year}_${month < 10 ? `0${month}` : month}_${date < 10 ? `0${date}` : date}` +
        '_' +
        timestamp +
        '_' +
        file.name;
      return (file.renameFileName = newName);
    },
    dictDefaultMessage: ReactDOMServer.renderToStaticMarkup(
      <Grid className={classes.Dropzone} style={{ cursor: 'pointer' }}>
        <img
          alt="upload"
          className={classes.Icon}
          src="/static/images/baseline-cloud_upload-24px.svg"
        />
        Kéo và thả ảnh vào đây
        <Typography className={classes.separator}>
          <span className={classes.span}> ---- hoặc chọn từ ----</span>
        </Typography>
        <button className={classes.button} type="button">
          Thiết bị
        </button>
      </Grid>
    ),
    includeStyling: false,
    previewsContainer: false,
    thumbnailWidth: 250,
    thumbnailHeight: 250,
    parallelUploads: 20,
    acceptedFiles: 'image/*'
  };
  const handleFileAdded = (file) => {
    let image = {
      caption: '',
      name: '',
      dataURL: null,
      progress: null,
      type: 1
    };
    image.name = file.renameFileName;
    image.dataURL = file.dataURL;
    let pos = image.name.lastIndexOf('.');
    image.name = image.name.substr(0, pos < 0 ? image.name.length : pos) + '.jpg';
  };

  const eventHandlers = {
    init: (dz) => setDropzone(dz),
    thumbnail: (file) => handleFileAdded(file)
  };

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center">
        <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
      </Grid>
      <Grid container>
        {images.length > 0 &&
          images.map((i, index) => (
            <Grid key={index}>
              <img src={i.dataURL} alt="Smiley face" height="200" width="200" />
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default CustomDropzone;
