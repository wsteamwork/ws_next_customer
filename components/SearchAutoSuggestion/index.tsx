import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { PinDropRounded, Close, SearchRounded } from '@material-ui/icons';
import {
  IconButton,
  Paper,
  Fade,
  Grid,
  List,
  TextField,
  InputAdornment,
  MenuItem
} from '@material-ui/core';
import { axios } from '@/utils/axiosInstance';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { SearchSuggestRes, SearchSuggestData } from '@/types/Requests/Search/SearchResponse';
import { useTranslation } from 'react-i18next';
import Autosuggest from 'react-autosuggest';
// @ts-ignore
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';
import { IS_SEARCH_CITY, IS_SEARCH_DISTRICT } from '@/types/Requests/Search/SearchResponse';
import { ThemeCustom } from '../Theme';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/styles';
import HomeIcon from '@material-ui/icons/HomeRounded';
import LocationIcon from '@material-ui/icons/LocationOnRounded';
import Popular from '@material-ui/icons/WhatshotRounded';
interface Iprops {
  classes?: any;
}
//TODO: 
// - Convert JS-CSS to External CSS
// - Make component customizable
// - Refactor refactor

const styles: any = (theme: ThemeCustom) =>
  createStyles({
    container: {
      width: '80%',
      margin: '0 auto'
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      zIndex: 10000,
      maxHeight: 192,
      overflowY: 'scroll',
      borderTop: '1px solid #EBEBEB',
      width: '80%',
    },

    suggestionsContainerOpenNavSearch: {
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
      top: 46,
      maxHeight: 322,
      overflowY: 'scroll',
      borderTop: '1px solid #EBEBEB'
    },
    suggestion: {
      display: 'block'
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    },
    outlineInput: {
      padding: '12px 16px'
    },
    input: {
      color: '#000'
    },
    marginSearch: {
      marginLeft: 23
    },
    gutters: {
      paddingLeft: 22
    },
    suggestionText: {
      marginLeft: 10,
      fontSize: 14
    },
    searchIcon: {
      width: 23,
      height: 23,
      verticalAlign: 'sub'
    },
    paperShadow: {
      boxShadow: '#1a1a1d 0px 9px 26px -14px'
    },
    left: {
      display: 'flex'
    },
    right: {
      textAlign: 'right',
      fontSize: 14
    }
  });

const SearchAutoSuggestion: FC<Iprops> = (props: Iprops) => {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [data, setData] = useState<SearchSuggestData[]>([]);
  const { t } = useTranslation();


  const getDataSearch = async (value: string): Promise<any> => {
    const res: AxiosRes<SearchSuggestRes> = await axios.get(`search-suggestions?key=${value}`);
    //Change response to one-array-data
    //if (Array.isArray(res.data.data[0]))
    let dataChange: SearchSuggestData[] = [];
    Object.keys(res.data.data[0]).map((key) => {
      res.data.data[0][key].map((item) => {
        dataChange.push(item);
      });
    });
    setData(dataChange);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>, { newValue }: { newValue: any }) => {
    setSearchText(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: any }) => {
    getDataSearch(value);
  };

  const onSuggestionsClearRequested = () => {
    setData([]);
  };

  const getSuggestionValue = (suggestion: any) => {
    setSearchText(suggestion.name);
    return suggestion.name;
  };

  const handleEmptyText = () => {
    setSearchText('');
  };

  const handleSuggestionSelected = (
    e: any,
    { suggestion, method }: { suggestion: SearchSuggestData; method: string }
  ) => {
    if (method === 'enter') {
      e.preventDefault();
    }
    setSearchText(suggestion.name);
  };

  const renderInputComponent = (inputProps: any) => {
    const { inputRef = () => {}, ref, ...other } = inputProps;
    return (
      <TextField
        fullWidth
        placeholder={t('home:SearchAutocomplete:toGo')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Fade in={!!searchText}>
                <IconButton onClick={handleEmptyText} className="iconButton" aria-label="Search">
                  <Close fontSize="small" />
                </IconButton>
              </Fade>
            </InputAdornment>
          ),
          inputRef: (node) => {
            ref(node);
            inputRef(node);
          },
          disableUnderline: true
        }}
        {...other}
      />
    );
  };

  const renderSuggestion = (suggestion: SearchSuggestData, { query, isHighlighted }: any) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);
    return (
      <MenuItem selected={isHighlighted} component="div" classes={{ gutters: classes.gutters }}>
        <Grid container>
          <Grid item xs={7} md={7} className={classes.left}>
            <div>
              {suggestion.type === IS_SEARCH_CITY || suggestion.type === IS_SEARCH_DISTRICT ? (
                <HomeIcon className={classes.searchIcon} />
              ) : (
                <LocationIcon className={classes.searchIcon} />
              )}
            </div>
            <div className={classes.suggestionText}>
              {parts.map((part: { text: React.ReactNode; highlight: any }, index) => (
                <span key={index}>{part.text}</span>
              ))}
            </div>
          </Grid>
          <Grid item xs={5} md={5} className={classes.right}>
            {suggestion.number_room !== 0 && suggestion.number_room! && (
              <p>
                {suggestion.number_room} {t('home:SearchAutocomplete:accommodation')}
              </p>
            )}
          </Grid>
        </Grid>
      </MenuItem>
      // <ListItem className="itemSearchResponse">
      //   <Grid container>
      //     <Grid item xs={7} className="left">
      //       {parts.map((part: { text: React.ReactNode; highlight: any }, index) => (
      //         <span key={index}>{part.text}</span>
      //       ))}
      //       {/* <p className="name">{suggestion.name}</p> */}
      //     </Grid>
      //     <Grid item xs={5} className="right">
      //       <span className="citySearchResponse">
      //         {suggestion.type === IS_SEARCH_CITY
      //           ? t('home:SearchAutocomplete:city')
      //           : suggestion.type === IS_SEARCH_DISTRICT
      //           ? t('home:SearchAutocomplete:district')
      //           : t('home:SearchAutocomplete:room')}
      //       </span>
      //     </Grid>
      //   </Grid>

      //   <Grid container className="desc">
      //     <Grid item className="right">
      //       {suggestion.number_room !== 0 && suggestion.number_room! && (
      //         <p>
      //           {suggestion.number_room} {t('home:SearchAutocomplete:accommodation')}
      //         </p>
      //       )}
      //     </Grid>
      //   </Grid>
      // </ListItem>
    );
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: data,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    onSuggestionSelected: handleSuggestionSelected,
    getSuggestionValue,
    renderSuggestion
  };
  return (
    <Autosuggest
      {...autosuggestProps}
      //alwaysRenderSuggestions={true}
      inputProps={{
        id: 'search-autosuggest-simple',
        value: searchText,
        onChange: onChangeInput
      }}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={(options) => (
        <Paper elevation={0} className="searchResponse" {...options.containerProps}>
          {options.children}
        </Paper>
      )}
    />
    // <ClickAwayListener onClickAway={() => setOpen(false)}>
    //   <div className="searchAutocomplete">
    //     <Paper className="root" elevation={0} onClick={() => setOpen(true)}>
    //       <IconButton className="iconButton" aria-label="Menu">
    //         <PinDropRounded />
    //       </IconButton>
    //       <Divider className="divider" />
    //

    //       <Fade in={!!searchText}>
    //         <IconButton onClick={handleEmptyText} className="iconButton" aria-label="Search">
    //           <Close fontSize="small" />
    //         </IconButton>
    //       </Fade>
    //     </Paper>
    //     <Collapse in={open} timeout={300}>
    //       <ListResSearch data={data} suggestionSelected={suggestionSelected}></ListResSearch>
    //     </Collapse>
    //   </div>
    // </ClickAwayListener>
  );
};

export default compose<Iprops, any>(withStyles(styles))(SearchAutoSuggestion);
