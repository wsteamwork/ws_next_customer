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

const UpdateBathRoomImage: FC<IProps> = (props) => {
  const { router } = useContext(GlobalContext);
  const id = router.query.id;
  const { t } = useTranslation();
  const dispatch_img = useDispatch<Dispatch<ImageReducerAction>>();
  const { room_id, number_bathroom, bathrooms } = useSelector<ReducersList, ImageReducerState>(
    (state) => state.images
  );
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>('success');
  useEffect(() => {
    getDataImages(id, dispatch_img);
  }, []);

  const UpdateBathImage: any = () => {
    const res = handleUpdateListing(room_id, {
      bathrooms: bathrooms
    });
    if (res) {
      setOpenSnack(true);
      setMessageSnack('Cập nhật ảnh phòng tắm thành công !');
    } else {
      setOpenSnack(true);
      setStatusSnack('error');
      setMessageSnack('Cập nhật ảnh phòng tắm thất bại !');
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
          handleSave={UpdateBathImage}
          openSnack={openSnack}
          messageSnack={messageSnack}
          statusSnack={statusSnack}
          handleCloseSnack={handleCloseSnack}>
          {number_bathroom ? (
            <Fragment>
              <Grid container justify="center" alignContent="center">
                {_.times(number_bathroom, (i) =>
                  bathrooms[`bathroom_${i + 1}`] && bathrooms[`bathroom_${i + 1}`].images.length ? (
                    <Grid item key={i} xs={12}>
                      <UppyImage
                        label={`${t('details:images:labelBathRooms')} ${i + 1}`}
                        subLabel={t('details:images:subLabelBathRooms')}
                        type_txt={`bathroom_${i + 1}`}
                        typeUpload={{ type: 'setBathRoomImage' }}
                        typeImage={6}
                        initImages={
                          bathrooms[`bathroom_${i + 1}`] && bathrooms[`bathroom_${i + 1}`].images
                            ? bathrooms[`bathroom_${i + 1}`].images
                            : []
                        }
                      />
                      <Grid item xs={12} sm={12}>
                        <CardImageCaption
                          key={i}
                          type_txt={`bathroom_${i + 1}`}
                          typeUpload={{ type: 'setBathRoomImage' }}
                          typeImage={6}
                          subLabel={`Thêm chú thích cho ảnh phòng tắm ${i + 1}`}
                          arrImage={bathrooms[`bathroom_${i + 1}`].images}
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
    [bathrooms]
  );
};

export default UpdateBathRoomImage;
