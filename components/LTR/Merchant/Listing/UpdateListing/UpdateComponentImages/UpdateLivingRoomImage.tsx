import QuantityButtons from '@/components/ReusableComponents/QuantityButtons';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { handleUpdateListing } from '@/store/Redux/Reducers/LTR/UpdateListing/listingdetails';
import Grid from '@material-ui/core/Grid/Grid';
import React, {
  FC,
  Fragment,
  useContext,
  useEffect,
  useState,
  SyntheticEvent,
  useMemo
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import CardWrapperUpdate from '../CardWrapperUpdate';
import {
  ImageReducerAction,
  getDataImages,
  ImageReducerState
} from '@/store/Redux/Reducers/LTR/CreateListing/Step2/images';
import { ReducersList } from '@/store/Redux/Reducers';
import UppyImage from '../../CreateListing/UploadImage/UppyImage';
import { useTranslation } from 'react-i18next';
import CardImageCaption from '../../CreateListing/UploadImage/CardImageCaption';
interface IProps {}

const UpdateLivingRoomImage: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { t } = useTranslation();
  const dispatch_img = useDispatch<Dispatch<ImageReducerAction>>();
  const { room_id, livingrooms } = useSelector<ReducersList, ImageReducerState>(
    (state) => state.images
  );
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>('success');

  useEffect(() => {
    getDataImages(id, dispatch_img);
  }, []);

  const UpdateLivingImage: any = () => {
    const res = handleUpdateListing(room_id, {
      livingrooms: livingrooms
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack('Cập nhật ảnh phòng khách thành công !');
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật ảnh phòng khách thất bại !');
    }
  };

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <Fragment>
      <CardWrapperUpdate
        handleSave={UpdateLivingImage}
        openSnack={openSnack}
        messageSnack={messageSnack}
        statusSnack={statusSnack}
        handleCloseSnack={handleCloseSnack}>
        {livingrooms.images.length ? (
          <Fragment>
            <Grid container justify="center" alignContent="center">
              <Grid item xs={12}>
                <UppyImage
                  label={t('details:images:labelLivingRooms')}
                  subLabel={t('details:images:subLabelLivingRooms')}
                  typeUpload={{ type: 'setLivingRoomImage' }}
                  typeImage={7}
                  initImages={livingrooms.images.length ? livingrooms.images : []}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <CardImageCaption
                subLabel="Thêm chú thích cho ảnh phòng khách căn hộ"
                typeUpload={{ type: 'setLivingRoomImage' }}
                typeImage={7}
                arrImage={livingrooms.images}
              />
            </Grid>
          </Fragment>
        ) : (
          ''
        )}
      </CardWrapperUpdate>
    </Fragment>
  );
};

export default UpdateLivingRoomImage;
