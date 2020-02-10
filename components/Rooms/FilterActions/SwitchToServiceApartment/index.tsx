// import IOSSwitch from './SwitchMap/IOSSwitch';
import { updateRouter } from '@/store/Context/utility';
import { ReducersList } from '@/store/Redux/Reducers';
import { SearchFilterAction } from '@/store/Redux/Reducers/Search/searchFilter';
import { FormControlLabel } from '@material-ui/core';
import React, { ChangeEvent, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import IOSSwitch from '../SwitchMap/IOSSwitch';

const SwitchToServiceApartment: FC = () => {
  const dispatch = useDispatch<Dispatch<SearchFilterAction>>();
  const leaseTypePathName = useSelector<ReducersList, string>((state) => state.searchFilter.leaseTypePathName);
  const filterOnlyApartment = useSelector<ReducersList, number>((state) => state.searchFilter.onlyApartmentBuilding);
  const [enableApartment, setEnableApartment] = useState(filterOnlyApartment);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (enableApartment == 1) {
      dispatch({ type: 'SET_ONLY_APARTMENT_BUILDING', onlyApartmentBuilding: 0 });
      setEnableApartment(0);
      updateRouter(leaseTypePathName, true, 'only_apartment_building', 0, 'page', 1);
    } else {
      dispatch({ type: 'SET_ONLY_APARTMENT_BUILDING', onlyApartmentBuilding: 1 });
      setEnableApartment(1);
      updateRouter(leaseTypePathName, true, 'only_apartment_building', 1, 'page', 1);
    }
  };

  return (
    <FormControlLabel
      control={<IOSSwitch checked={enableApartment == 1} onChange={handleChange} value="checkedB" />}
      label="Service Apartment"
    />
  );
};

export default SwitchToServiceApartment;
