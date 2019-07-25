import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { PinDropRounded, Close } from '@material-ui/icons';
import {
  Collapse,
  IconButton,
  Divider,
  InputBase,
  Paper,
  ClickAwayListener,
  Fade
} from '@material-ui/core';
import { axios } from '@/utils/axiosInstance';
import { AxiosRes } from '@/types/Requests/ResponseTemplate';
import { SearchSuggestRes } from '@/types/Requests/Search/SearchResponse';
import { useTranslation } from 'react-i18next';

import dynamic from 'next/dynamic';

const ListResSearch = dynamic(() => import('./ListResSearch'));

const SearchAutocomplete: FC = (props) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<SearchSuggestRes>({});
  const { t } = useTranslation();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    getDataSearch(e.target.value);
  };

  useEffect(() => {
    getDataSearch('');
  }, []);

  const getDataSearch = async (value: string): Promise<any> => {
    const res: AxiosRes<SearchSuggestRes> = await axios.get(`search-suggestions?key=${value}`);
    setData(res.data.data[0]);
  };

  const handleEmptyText = () => {
    setSearchText('');
    getDataSearch('');
  };

  const suggestionSelected = (value) => {
    setSearchText(value);
    getDataSearch(value);
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="searchAutocomplete">
        <Paper className="root" elevation={0} onClick={() => setOpen(true)}>
          <IconButton className="iconButton" aria-label="Menu">
            <PinDropRounded />
          </IconButton>
          <Divider className="divider" />
          <InputBase
            value={searchText}
            onChange={handleChangeInput}
            className="input"
            placeholder={t('home:SearchAutocomplete:toGo')}
          />

          <Fade in={!!searchText}>
            <IconButton onClick={handleEmptyText} className="iconButton" aria-label="Search">
              <Close fontSize="small" />
            </IconButton>
          </Fade>
        </Paper>
        <Collapse in={open} timeout={300}>
          <ListResSearch data={data} suggestionSelected={suggestionSelected}></ListResSearch>
        </Collapse>
      </div>
    </ClickAwayListener>
  );
};

export default SearchAutocomplete;
