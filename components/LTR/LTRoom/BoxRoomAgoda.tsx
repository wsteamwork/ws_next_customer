import AgodaRoomCard from "@/components/AgodaRoomCard";
import { GlobalContext, IGlobalContext } from "@/store/Context/GlobalContext";
import { ReducersList } from "@/store/Redux/Reducers";
import { getRoomSameBuilding, LTRoomReducerAction } from "@/store/Redux/Reducers/LTR/LTRoom/ltroomReducer";
import { LTRoomIndexRes } from "@/types/Requests/LTR/LTRoom/LTRoom";
import { Grid, Theme, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from '@material-ui/styles';
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

interface IProps { };

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({

  })
);
const BoxRoomAgoda: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const { t } = useTranslation();
  const ltroom = useSelector<ReducersList, LTRoomIndexRes>((state) => state.ltroomPage.room);
  const dispatch = useDispatch<Dispatch<LTRoomReducerAction>>();
  const [dataRoomSameBuilding, setDataRoomSameBuilding] = useState([]);
  const { width } = useContext<IGlobalContext>(GlobalContext);

  useEffect(() => {
    if (ltroom.apartment_building_id)
      getRoomSameBuilding(ltroom.apartment_building_id).then((res) => {
        dispatch({ type: 'setRoomSameBuilding', payload: res.data });
        setDataRoomSameBuilding(res.data);
      });
  }, [ltroom.apartment_building_id]);

  const renderAgodaRoomCard = () => {
    return (
      <AgodaRoomCard
        room={ltroom}
      />
    );
  };

  return (
    <Fragment>
      <Grid className={classes.title}>
        <Typography variant="h5" className={classes.name} gutterBottom>
          {t('room:roomSameBuilding')}
        </Typography>
        {t('room:buildingName') + ltroom.apartment_building}
      </Grid>

      {renderAgodaRoomCard()}
    </Fragment>
  )
}
export default BoxRoomAgoda;