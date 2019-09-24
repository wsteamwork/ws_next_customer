import React, { FC, Fragment, useState } from 'react';
import { Grid, createStyles, makeStyles, Theme, Typography, TextField } from '@material-ui/core';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import GoogleDrive from '@uppy/google-drive';
import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@uppy/react';
import AwsS3 from '@uppy/aws-s3';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/url/dist/style.css';
import 'uppy/dist/uppy.min.css';
import fetch from 'isomorphic-fetch';
import Promise from 'es6-promise';
interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme>((theme: Theme) => createStyles({}));

const UppyImage: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const [state, setState] = useState({
    showInlineDashboard: true
  });
  const initImages = async (arrImg) => {
    for (let i = 0; i < arrImg.length; i++) {
      const img = arrImg[i];
      await fetch(img)
        .then((res) => res.blob())
        .then((blob) => {
          console.log(2)
          uppy.addFile({
            name: 'image.jpg',
            type: blob.type,
            data: blob
          });
        })
        .catch((err) => console.error(err));
    };
  };
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
      maxNumberOfFiles: 10,
      allowedFileTypes: ['image/*']
    },
    onBeforeFileAdded: (currentFile, files) => {
      console.log(1)
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
      let modifiedFile = Object.assign({}, currentFile, { name: newName });
      return modifiedFile;
    }
  })
    .use(Tus, { endpoint: 'https://master.tus.io/files/', limit: 20 })
    .use(GoogleDrive, {
      companionUrl: 'https://master.tus.io/files/'
    })
    .on('complete', (result) => {
      console.log('successful files:', result.successful);
    })
    .on('upload-success', (file, response) => {
      var img = new Image();
      img.width = 400;
      img.alt = file.id;
      img.src = response.uploadURL;
    });
  initImages([
    'https://s3-ap-southeast-1.amazonaws.com/westay-img/lg/2019_03_16_e410127450295795210b.jpg',
  ]);

  uppy.getFiles().forEach((file) => {
    uppy.setFileState(file.id, {
      progress: { uploadComplete: true, uploadStarted: false }
    });
  });

  return (
    <Fragment>
      <Grid container justify="center" alignContent="center">
        <div>
          <h1>Đăng ảnh căn hộ</h1>
          {state.showInlineDashboard && (
            <Dashboard
              uppy={uppy}
              trigger={'.UppyModalOpenerBtn'}
              showProgressDetails={true}
              note={'Bạn phải đăng ít nhất 2 ảnh, kích thước tối đa của mỗi ảnh là 25 MB'}
              height={500}
              plugins={['GoogleDrive']}
              metaFields={[
                { id: 'name', name: 'Tên ảnh', placeholder: 'Đặt tên ảnh' },
                { id: 'caption', name: 'Mô tả', placeholder: 'Mô tả chi tiết về bức ảnh này' }
              ]}
            />
          )}
        </div>
      </Grid>
    </Fragment>
  );
};

export default UppyImage;
