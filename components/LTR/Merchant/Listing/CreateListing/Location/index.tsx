import {
  CreateListingActions,
  CreateListingState
} from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { FormControl, OutlinedInput } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React, { Dispatch, FC, useEffect, useState } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { axios_merchant } from '@/utils/axiosInstance';
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
  const { address, building } = useSelector<ReducersList, CreateListingState>(
    (state) => state.createListing
  );
  const [addressInput, setAddress] = useState<string>(address);
  const [buildingInput, setBuilding] = useState<string>(building);
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [coordinate, setCoordinate] = useState<Coordinate>(null);
  const [defaultCenter, setDefaultCenter] = useState<Coordinate | null>(null);
  const [citiesList, setCitiesList] = useState<any[]>([]);

  const getCities = async () => {
    try {
      const res = await axios_merchant.get(`/cities`);
      return res
    } catch (error) {}
  };

  useEffect(() => {
    getCities().then((res) => {
      setCitiesList(res.data.data.map(city => city.name));
    });
  }, []);

  useEffect(() => {
    console.log(coordinate);
    dispatch({
      type: 'SET_COORDINATE',
      payload: coordinate
    });
  }, [coordinate]);
  useEffect(() => {
    console.log(addressInput);
    dispatch({
      type: 'SET_ADDRESS',
      payload: addressInput
    });
  }, [addressInput]);
  useEffect(() => {
    console.log(buildingInput);

    dispatch({
      type: 'SET_BUILDING',
      payload: buildingInput
    });
  }, [buildingInput]);

  const onClickMap = (e: google.maps.MouseEvent) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setCoordinate({
      lat: lat,
      lng: lng
    });
  };
  const MapWithAMarker = withGoogleMap<GoogleMapProps>((props) => (
    <GoogleMap defaultZoom={15} defaultCenter={props.defaultCenter} onClick={props.onClickMap}>
      <Marker position={props.coordinate} />
    </GoogleMap>
  ));

  const handleChange = (event) => {
    setBuilding(event.target.value);
  };

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
      <h3>Địa chỉ</h3>
      <Geosuggest
        initialValue={addressInput}
        country="vn"
        placeholder="Start typing!"
        onSuggestSelect={onSuggestSelect}
        location={new google.maps.LatLng(53.558572, 9.9278215)}
        radius={20}
        autoActivateFirstSuggest
      />
      <h3>Toà nhà (Tuỳ chọn)</h3>
      <Grid style={{ width: 'calc(80% - 8px)' }}>
        <FormControl variant="outlined">
          <OutlinedInput
            fullWidth
            placeholder="Số căn hộ + Mã chung cư"
            id="component-outlined"
            value={buildingInput}
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
