import { axios, axios_merchant } from '@/utils/axiosInstance';
import { MenuItem, Paper, TextField, OutlinedInput } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Close, SearchRounded } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/HomeRounded';
import LocationIcon from '@material-ui/icons/LocationOnRounded';
import { withStyles } from '@material-ui/styles';
// @ts-ignore
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React, {
  ChangeEvent,
  FC,
  useContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch
} from 'react';
import Autosuggest from 'react-autosuggest';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'recompose';
import deburr from 'lodash/deburr';
import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
interface Iprops {
  //   classes?: any;
  setDistrictList: Dispatch<SetStateAction<any[]>>;
  setDisabledDistrictField: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  divider: {
    height: theme.spacing(2)
  }
}));

const CitiesList: FC<Iprops> = (props: Iprops) => {
  const classes = useStyles(props);
  //   const { classes } = props;
  const { setDistrictList, setDisabledDistrictField } = props;
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  const [stateSuggestions, setStateSuggestions] = useState<any[]>([]);
  const [suggestionsList, setSuggestionsList] = useState<any[]>([]);
  const [city_id, setCityId] = useState<number>(null);
  const [state, setState] = React.useState({
    city: '',
    district: '',
    city_id: null
  });

  const getCities = async () => {
    try {
      const res = await axios_merchant.get(`/cities`);
      return res;
    } catch (error) {}
  };
  const getDistricts = async () => {
    try {
      const res = await axios_merchant.get(`/districts?city_id=${city_id}`);
      return res;
    } catch (error) {}
  };

  useEffect(() => {
    getDistricts().then((res) =>
      setDistrictList(
        res.data.data.map((district) => {
          let obj = {};
          obj['value'] = district.name;
          obj['id'] = district.id;
          return obj;
        })
      )
    );
    if (city_id > 0) setDisabledDistrictField(false);
  }, [city_id]);

  useEffect(() => {
    getCities().then((res) => {
      setSuggestionsList(
        res.data.data.map((city) => {
          let obj = {};
          obj['name'] = city.name;
          obj['id'] = city.id;
          return obj;
        })
      );
    });
  }, []);

  function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
      <OutlinedInput
        fullWidth
        InputProps={{
          inputRef: (node) => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input
          }
        }}
        {...other}
        labelWidth={0}
      />
      //   <TextField
      //     fullWidth
      //     InputProps={{
      //       inputRef: (node) => {
      //         ref(node);
      //         inputRef(node);
      //       },
      //       classes: {
      //         input: classes.input
      //       }
      //     }}
      //     {...other}
      //   />
    );
  }

  function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestionsList.filter((suggestion) => {
          const keep =
            count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }
  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part) => (
            <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
              {part.text}
            </span>
          ))}
        </div>
      </MenuItem>
    );
  }

  const handleSuggestionsFetchRequested = ({ value }) => {
    setStateSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setStateSuggestions([]);
  };

  const handleChange = (name) => (event, { newValue }) => {
    setDisabledDistrictField(true);
    setState({
      ...state,
      [name]: newValue
    });
  };
  function getSuggestionValue(suggestion) {
    setCityId(suggestion.id);

    dispatch({
      type: 'SET_CITY_ID',
      payload: suggestion.id
    });
    return suggestion.name;
  }

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  };
  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        classes,
        id: 'react-autosuggest-sksimple',
        placeholder: 'Chọn thành phố',
        value: state.city,
        onChange: handleChange('city')
      }}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={(options) => (
        <Paper {...options.containerProps} square>
          {options.children}
        </Paper>
      )}
    />
  );
};

export default CitiesList;