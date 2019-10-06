import { FormControl, OutlinedInput } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React, { FC, useState, Dispatch, useEffect } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { useDispatch, useSelector } from 'react-redux';
import {
  CreateListingActions,
  CreateListingState
} from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { ReducersList } from '@/store/Redux/Reducers';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
interface IProps {}

interface Coordinate {
  lat: number;
  lng: number;
}

interface GoogleMapProps {
  defaultCenter: Coordinate | null;
  coordinate: Coordinate;
  onClickMap: (e: google.maps.MouseEvent | google.maps.IconMouseEvent) => void;
}

const Location: FC<IProps> = (props) => {
  const [address, setAddress] = useState<string>('');
  const [building, setBuilding] = useState<string>('');
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  // const { latitude, longitude } = useSelector<ReducersList, CreateListingState>(
  //   (state) => state.createListing
  // );
  const [coordinate, setCoordinate] = useState<Coordinate>(null);
  const [defaultCenter, setDefaultCenter] = useState<Coordinate | null>(null);

  useEffect(() => {
    console.log(address);
    dispatch({
      type: 'SET_COORDINATE',
      payload: coordinate
    });
    dispatch({
      type: 'SET_ADDRESS',
      payload: address
    });
    dispatch({
      type: 'SET_BUILDING',
      payload: building
    });
  }, [coordinate, address, building]);

  const onClickMap = (e: google.maps.MouseEvent) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setCoordinate({
      lat: lat,
      lng: lng
    });
  };
  const onDrag = () => {
    // setCoordinate({
    //   lat: lat,
    //   lng: lng
    // });
  };

  const MapWithAMarker = withGoogleMap<GoogleMapProps>((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={props.defaultCenter}
      onClick={props.onClickMap}
      // defaultOptions={{ draggable: false }}
      onDrag={onDrag}>
      <Marker position={props.coordinate} />
    </GoogleMap>
  ));

  const handleChange = (event) => {
    setBuilding(event.target.value);
  };

  // const handleBlur = (value) => {
  //   console.log(value);
  //   setAddress(value);
  // };

  const onSuggestSelect = (place: Suggest) => {
    const {
      location: { lat, lng },
      label
    } = place;
    setCoordinate({
      lat,
      lng
    });

    setDefaultCenter({
      lat,
      lng
    });

    setAddress(label);
  };

  return (
    <div className="step1-tab3-location">
      <Grid className="createListing-location">
        <Grid className="createListing-heading-1">Địa chỉ căn hộ của bạn</Grid>
        <Grid className="createListing-subTitle">
          Khách sẽ chỉ biết được địa chỉ chính xác sau khi đặt phòng thành công
        </Grid>
      </Grid>
      <h2>Địa chỉ</h2>
      <Geosuggest
        country="vn"
        placeholder="Start typing!"
        onSuggestSelect={onSuggestSelect}
        location={new google.maps.LatLng(53.558572, 9.9278215)}
        radius={20}
        autoActivateFirstSuggest
      />
      <h2>Toà nhà (Tuỳ chọn)</h2>
      <Grid style={{ width: 'calc(80% - 8px)' }}>
        <FormControl variant="outlined">
          <OutlinedInput
            fullWidth
            placeholder="Số căn hộ + Mã chung cư"
            id="component-outlined"
            value={building}
            onChange={handleChange}
            labelWidth={0}
          />
        </FormControl>
      </Grid>
      <Grid style={{ display: 'flex' }}>
        <Grid>
          <h3>Thành phố</h3>
          <FormControl variant="outlined">
            <OutlinedInput
              fullWidth
              id="component-outlined"
              // value={a}
              // onChange={handleChange}
              labelWidth={0}
            />
          </FormControl>
        </Grid>
        <Grid>
          <h3>Quận Huyện</h3>
          <FormControl variant="outlined">
            <OutlinedInput
              fullWidth
              id="component-outlined"
              // value={address}
              // onChange={handleChange}
              labelWidth={0}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid className="createListing-heading-2">Đây đã phải là địa chỉ đúng chưa?</Grid>
      <h3 className="createListing-subTitle">
        Nếu cần thiết, bạn có thể thay đổi vị trí cho chính xác. Chỉ những khách hàng xác nhận đặt
        phòng mới có thể thấy được
      </h3>

      <div></div>
      {defaultCenter && (
        <MapWithAMarker
          containerElement={<div style={{ height: `300px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          defaultCenter={defaultCenter}
          coordinate={coordinate}
          onClickMap={onClickMap}
        />
      )}
    </div>
  );
};

export default Location;
