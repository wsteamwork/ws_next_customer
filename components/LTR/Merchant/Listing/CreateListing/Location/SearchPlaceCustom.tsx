/*global google*/
import CitiesList from '@/components/LTR/Merchant/Listing/CreateListing/Location/CitiesList';
import SelectCustom from '@/components/ReusableComponents/SelectCustom';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  CreateListingActions,
  CreateListingState
} from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { FormControl, OutlinedInput } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import classNames from 'classnames';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import deepEqual from 'lodash.isequal';
import React, { Dispatch, FC, Fragment, useEffect, useMemo, useState, useRef } from 'react';
// import Geosuggest, { Suggest } from 'react-geosuggest';
import { GoogleMap, Marker, withGoogleMap, WithGoogleMapProps } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { useTranslation } from 'react-i18next';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

interface IProps {
  setCoordinateMarker: any;
  setDefaultCenter: any;
  setAddress: any;
  addressInput: string;
}

let autocomplete = null;

const SearchPlaceCustom: FC<IProps> = (props) => {
  const { setCoordinateMarker, setDefaultCenter, setAddress, addressInput } = props;
  const loaded = useRef(false);

  const handleScriptLoad = () => {
    const inputEl = document.getElementById('standalone-search-box');
    if (typeof google === 'object' && typeof google.maps === 'object') {
      autocomplete = new (window as any).google.maps.places.Autocomplete(
        inputEl as HTMLInputElement
      );
      autocomplete.setComponentRestrictions({ country: 'vn' });
      autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
      autocomplete.addListener('place_changed', () => {
        const placeInfo = autocomplete.getPlace();
        const location = placeInfo.geometry.location;
        setAddress(placeInfo.name);
        setCoordinateMarker({
          lat: location.lat(),
          lng: location.lng()
        });
        setDefaultCenter({
          lat: location.lat(),
          lng: location.lng()
        });
      });
    }
  };

  const loadGoogleMapScript = (url: string, position: HTMLElement | null, id: string) => {
    if (!position) return;
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('async', '');
    scriptTag.setAttribute('id', id);
    scriptTag.setAttribute('type', 'text/javascript');
    scriptTag.addEventListener('load', handleScriptLoad);
    scriptTag.src = url;
    position.appendChild(scriptTag);
  };

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadGoogleMapScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}&libraries=geometry,places`,
        document.querySelector('head'),
        'google-maps-api'
      );
    }

    loaded.current = true;
  }

  return (
    <Fragment>
      <OutlinedInput
        type="text"
        placeholder="Nhập địa chỉ"
        // id="standalone-search-box"
        inputProps={{ id: 'standalone-search-box' }}
        value={addressInput}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        labelWidth={0}
        fullWidth
      />
    </Fragment>
  );
};

export default SearchPlaceCustom;
