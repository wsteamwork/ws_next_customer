import React, { FC, Fragment, useState, useContext, useEffect } from 'react';
import { Grid, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import GoogleDrive from '@uppy/google-drive';
import XHRUpload from '@uppy/xhr-upload';
import { Dashboard } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/url/dist/style.css';
import 'uppy/dist/uppy.min.css';
import fetch from 'isomorphic-fetch';
import { handleSubmitImage } from '@/store/Context/LTR/ListingDetailContext';
import {
  ListingDetailContext,
  IListingDetailContext
} from '@/store/Context/LTR/ListingDetailContext';
interface IProps {
  classes?: any;
  label?: string;
  subLabel?: string;
  initImages?: any;
  height?: number;
  width?: number;
  typeUpload: any;
  maxImage?: number;
  type_txt?: string;
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    margin: {
      marginTop: theme.spacing(3)
    }
  })
);

const UppyImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { label, subLabel, initImages, height, width, maxImage, typeUpload, type_txt } = props;
  const [state, setState] = useState({
    showInlineDashboard: true
  });
  const { dispatch } = useContext<IListingDetailContext>(ListingDetailContext);
  useEffect(() => {
    if (type_txt) {
      dispatch({ type: typeUpload.type, payload: { [`${type_txt}`]: { images: initImages } } });
    } else {
      dispatch({ type: typeUpload.type, payload: { images: initImages } });
    }
  }, []);

  const initImage = async (arrImg) => {
    for (let i = 0; i < arrImg.length; i++) {
      // const img = 'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/' + arrImg[i].name + '.jpg';
      let img = 'https://i.ibb.co/QP49Yyn/68509021-879169062453399-4079830846545068032-n.jpg';
      await fetch(img)
        .then((res) => res.blob())
        .then((blob) => {
          uppy.addFile({
            name: arrImg[i].name + '.jpg',
            data: blob
          });
        })
        .catch((err) => console.error(err));
    }
  };
  initImage(initImages);
  const uppy = Uppy({
    id: 'uppy',
    autoProceed: false,
    debug: true,
    locale: {
      strings: {
        addMore: 'Thêm ảnh',
        uploadComplete: 'Hoàn thành tải lên',
        dropPasteImport: 'Kéo thả ảnh vào đây, %{browse} hoặc chọn từ',
        uploadingXFiles: {
          '0': 'Đang tải lên %{smart_count} ảnh',
          '1': 'Đang tải lên %{smart_count} ảnh',
          '2': 'Đang tải lên %{smart_count} ảnh'
        },
        filesUploadedOfTotal: {
          '0': '%{complete} của %{smart_count} ảnh đã được tải lên',
          '1': '%{complete} của %{smart_count} ảnh đã được tải lên',
          '2': '%{complete} của %{smart_count} ảnh đã được tải lên'
        },
        uploadXFiles: {
          '0': 'Tải lên %{smart_count} ảnh',
          '1': 'Tải lên %{smart_count} ảnh',
          '2': 'Tải lên %{smart_count} ảnh'
        },
        xFilesSelected: {
          '0': '%{smart_count} ảnh đã tải lên',
          '1': '%{smart_count} ảnh đã tải lên',
          '2': '%{smart_count} ảnh đã tải lên'
        },
        saveChanges: 'Lưu thay đổi',
        done: 'Hoàn thành',
        editing: 'Đang thay đổi ảnh %{file}',
        xTimeLeft: '%{time} còn lại',
        cancel: 'Hủy',
        complete: 'Hoàn thành',
        addingMoreFiles: 'Đăng thêm ảnh',
        back: 'Quay lại',
        uploading: 'Hoàn thành'
      }
    },
    restrictions: {
      maxFileSize: 250000000,
      minNumberOfFiles: 1,
      maxNumberOfFiles: maxImage ? maxImage : 20,
      allowedFileTypes: ['image/*']
    },
    onBeforeFileAdded: (currentFile, files) => {
      if(currentFile.meta) {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let date = new Date().getDate();
        let timestamp = new Date().getTime();
        let newName =
        `${year}_${month < 10 ? `0${month}` : month}_${date < 10 ? `0${date}` : date}` +
          '_' +
          timestamp +
          '_' +
          currentFile.name;
        let pos = newName.lastIndexOf('.');
        newName = newName.substr(0, pos < 0 ? newName.length : pos) + '.jpg';
        let modifiedFile = Object.assign({}, currentFile, { name: newName });
        return modifiedFile;
      }
      return currentFile;
    }
  })
    .use(XHRUpload, {
      endpoint: 'http://ws-api.nhat/merchant-api/upload-image/',
      fieldname: 'file',
      limit: 20
    })
    .use(GoogleDrive, {
      companionUrl: 'https://master.tus.io/files/'
    })
    .on('file-added', (file) => {
      console.log('file-added', file);
    })
    .on('complete', (result) => {
      let imgs = [];
      result.successful.map((res) => {
        let img = { name: res.meta.name, caption: '', type: 1 };
        imgs = [...imgs, img];
      });
      if (type_txt) {
        dispatch({ type: typeUpload.type, payload: { [`${type_txt}`]: { images: imgs } } });
      } else {
        dispatch({ type: typeUpload.type, payload: { images: imgs } });
      }
    })
    .on('file-removed', (file) => {
      let index = initImages.findIndex((i) => i.name + '.jpg' === file.name);
      if (index > -1) {
        initImages.splice(index, 1);
        if (type_txt) {
          dispatch({ type: typeUpload.type, payload: { [`${type_txt}`]: { images: initImages } } });
        } else {
          dispatch({ type: typeUpload.type, payload: { images: initImages } });
        }
      }
      // console.log('file-removed', initImages);
    });

  return (
    <Fragment>
      <Grid container className={classes.margin}>
        <section>
          {label && (
            <Typography variant="h1" gutterBottom className="label main_label">
              {label}
            </Typography>
          )}
          {subLabel && (
            <Grid item className="normal_text">
              <span>{subLabel}</span>
            </Grid>
          )}
        </section>
        {state.showInlineDashboard && (
          <Dashboard
            uppy={uppy}
            trigger={'.UppyModalOpenerBtn'}
            showProgressDetails={true}
            note={'Bạn phải đăng ít nhất 2 ảnh, kích thước tối đa của mỗi ảnh là 25 MB'}
            height={height ? height : 500}
            width={width ? width : 700}
            thumbnailWidth={480}
            plugins={['GoogleDrive']}
            metaFields={[
              { id: 'name', name: 'Tên ảnh', placeholder: 'Đặt tên ảnh' },
              { id: 'caption', name: 'Mô tả', placeholder: 'Mô tả chi tiết về bức ảnh này' }
            ]}
          />
        )}
      </Grid>
    </Fragment>
  );
};

export default UppyImage;
