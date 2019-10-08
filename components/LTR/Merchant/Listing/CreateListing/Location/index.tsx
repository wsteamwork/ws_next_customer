import CitiesList from '@/components/LTR/Merchant/Listing/CreateListing/Location/CitiesList';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import { CreateListingActions, CreateListingState } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { FormControl, OutlinedInput } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import React, { Dispatch, FC, useEffect, useState } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import { useDispatch, useSelector } from 'react-redux';
interface IProps { }

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
  const [district, setDistrict] = useState<number>(null);
  const [districtList, setDistrictList] = useState<any[]>(null);
  const [disabledDistrictField, setDisabledDistrictField] = useState<boolean>(true);

  useEffect(() => {
    dispatch({
      type: 'SET_COORDINATE',
      payload: coordinate
    });
  }, [coordinate]);
  useEffect(() => {
    dispatch({
      type: 'SET_ADDRESS',
      payload: addressInput
    });
  }, [addressInput]);

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
    if (place) {
      let { lat, lng } = place.location;
      setCoordinate({
        lat,
        lng
      });
      setDefaultCenter({
        lat,
        lng
      });
      setAddress(place.label);
    }
  };

  const callBackOnChange = (value) => {
    setDistrict(value);
    dispatch({
      type: 'SET_DISTRICT_ID',
      payload: parseInt(value)
    });
  };

  const handleBlur = () => {
    dispatch({
      type: 'SET_BUILDING',
      payload: buildingInput
    });
  };

  return (
    <div className="step1-tab3-location">
      <Grid className="createListing-location">
        <Grid className="createListing-heading-1">Địa chỉ căn hộ của bạn</Grid>
        <Grid className="createListing-subTitle">
          Khách sẽ chỉ biết được địa chỉ chính xác sau khi đặt phòng thành công
        </Grid>
      </Grid>
      <h3 style={{ color: '#767676' }}>Địa chỉ</h3>
      <Geosuggest
        country="vn"
        placeholder="Nhập địa chỉ"
        onSuggestSelect={onSuggestSelect}
        location={new google.maps.LatLng(53.558572, 9.9278215)}
        radius={20}
      />
      <Grid style={{ width: 'calc(80% - 8px)', margin: '20px 0' }}>
        <h3 style={{ color: '#767676' }}>Toà nhà (Tuỳ chọn)</h3>

        <FormControl fullWidth variant="outlined">
          <OutlinedInput
            placeholder="Nhập số căn hộ"
            id="component-outlined"
            value={buildingInput}
            onChange={handleChange}
            onBlur={handleBlur}
            labelWidth={0}
          />
        </FormControl>
      </Grid>
      <Grid style={{ display: 'flex' }}>
        <Grid style={{ paddingRight: 20 }}>
          <Grid style={{ margin: '32px 0' }}>
            <h3
              style={{
                color: '#767676',
                paddingBottom: 8,
                fontSize: 16,
                fontWeight: 600,
                lineHeight: '1.375em'
              }}>
              Thành phố
            </h3>
            <CitiesList
              setDistrictList={setDistrictList}
              setDisabledDistrictField={setDisabledDistrictField}
            />
          </Grid>
        </Grid>
        <Grid>
          <SelectCustom
            name="district"
            // onChange={handleChangeSelect}
            value={district}
            options={districtList}
            title="Quận huyện"
            callBackOnChange={callBackOnChange}
            disabled={disabledDistrictField}
          />
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
