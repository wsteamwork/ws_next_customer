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
import _ from 'lodash';
interface IProps {}

const UpdateBedRoomImage: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { t } = useTranslation();
  const dispatch_img = useDispatch<Dispatch<ImageReducerAction>>();
  const { room_id, number_bedroom, bedrooms } = useSelector<ReducersList, ImageReducerState>(
    (state) => state.images
  );
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>('success');
  useEffect(() => {
    getDataImages(id, dispatch_img);
  }, []);

  const UpdateBedImage: any = () => {
    const res = handleUpdateListing(room_id, {
      bedrooms: bedrooms
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack('Cập nhật ảnh phòng ngủ thành công !');
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật ảnh phòng ngủ thất bại !');
    }
  };

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  return useMemo(
    () => (
      <Fragment>
        <CardWrapperUpdate
          handleSave={UpdateBedImage}
          openSnack={openSnack}
          messageSnack={messageSnack}
          statusSnack={statusSnack}
          handleCloseSnack={handleCloseSnack}>
          {number_bedroom ? (
            <Fragment>
              <Grid container justify="center" alignContent="center">
                {_.times(number_bedroom, (i) =>
                  bedrooms[`bedroom_${i + 1}`] && bedrooms[`bedroom_${i + 1}`].images.length ? (
                    <Grid item key={i} xs={12}>
                      <UppyImage
                        label={`${t('details:images:labelBedRooms')} ${i + 1}`}
                        subLabel={t('details:images:subLabelBedRooms')}
                        type_txt={`bedroom_${i + 1}`}
                        typeUpload={{ type: 'setBedRoomImage' }}
                        typeImage={5}
                        initImages={
                          bedrooms[`bedroom_${i + 1}`] && bedrooms[`bedroom_${i + 1}`].images
                            ? bedrooms[`bedroom_${i + 1}`].images
                            : []
                        }
                      />
                      <Grid item xs={12} sm={12}>
                        <CardImageCaption
                          key={i}
                          type_txt={`bedroom_${i + 1}`}
                          typeUpload={{ type: 'setBedRoomImage' }}
                          typeImage={5}
                          subLabel={`Thêm chú thích cho ảnh phòng ngủ ${i + 1}`}
                          arrImage={bedrooms[`bedroom_${i + 1}`].images}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    ''
                  )
                )}
              </Grid>
            </Fragment>
          ) : (
            ''
          )}
        </CardWrapperUpdate>
      </Fragment>
    ),
    [bedrooms]
  );
};

export default UpdateBedRoomImage;
