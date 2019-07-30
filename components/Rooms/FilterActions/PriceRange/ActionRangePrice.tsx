import FormControl from '@material-ui/core/FormControl/FormControl';
import Grid from '@material-ui/core/Grid/Grid';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import InputBase from '@material-ui/core/InputBase/InputBase';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  Fragment,
  ChangeEvent,
  SetStateAction,
  FC
} from 'react';
import InputRange, { Range } from 'react-input-range';
import _ from 'lodash';
import { Theme } from '@material-ui/core';
import {
  RoomIndexContext,
  MIN_PRICE,
  MAX_PRICE,
  STEP_PRICE,
  RoomIndexState
} from '@/store/Context/Room/RoomListContext';
import { WithStyles } from '@material-ui/styles';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';

interface IProps extends WithStyles<typeof styles> {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const usePriceEffect = (price: Range, setPrice: Dispatch<Range>, state: RoomIndexState) => {
  useEffect(() => {
    if (!_.isEqual(state.price, price)) {
      setPrice(state.price);
    }
  }, [state.price]);
};

const styles = (theme: Theme) =>
  createStyles({
    marginPriceRange: {
      paddingLeft: '20px !important'
    },
    bootstrapRoot: {
      'label + &': {
        marginTop: theme.spacing(2)
      }
    },
    bootstrapInput: {
      borderRadius: 4,
      backgroundColor: theme!.palette!.common!.white!,
      border: '1px solid #ced4da',
      fontSize: 14,
      padding: '0.25rem 1.35rem',
      transition: theme!.transitions!.create!(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: '#80bdff'
      }
    },
    adornment: {
      position: 'absolute',
      left: '0.4rem',
      zIndex: 2
    },
    applyButton: {
      background: 'transparent',
      boxShadow: 'none',
      color: '#ff9800',
      fontWeight: 700,
      textTransform: 'initial',
      fontSize: '16px',
      padding: '2px 11px'
    }
  });

const ActionRangePrice: FC<IProps> = (props) => {
  const { classes, setOpen } = props;
  const { t } = useTranslation();
  const { state, dispatch } = useContext(RoomIndexContext);

  const [price, setPrice] = useState<Range>({
    min: MIN_PRICE,
    max: MAX_PRICE
  });

  const setPriceEnhancement = (value: Range) => {
    if (value.min < MIN_PRICE) {
      value.min = MIN_PRICE;
    } else if (value.max > MAX_PRICE) {
      value.max = MAX_PRICE;
    }
    setPrice(value);
  };

  const handleChange = (name: keyof Range) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    if (isNaN(value) || event.target.value === '') {
      setPrice({ ...price, [name]: 0 });
    } else {
      if (name === 'max') {
        if (value > MAX_PRICE) {
          setPrice({ ...price, [name]: MAX_PRICE });
        } else {
          setPrice({ ...price, [name]: value });
        }
      } else {
        if (value < MIN_PRICE) {
          setPrice({ ...price, [name]: MIN_PRICE });
        } else {
          setPrice({ ...price, [name]: value });
        }
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPrice(state.price);
  };

  const hanldeSubmit = () => {
    setOpen(false);
    dispatch({ type: 'setPrices', price });
  };

  usePriceEffect(price, setPrice, state);

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid container item xs={12} className={classes.marginPriceRange}>
          <InputRange
            allowSameValues={false}
            // onChangeComplete={afterChange}
            minValue={MIN_PRICE}
            maxValue={MAX_PRICE}
            step={STEP_PRICE}
            onChange={setPriceEnhancement}
            value={price}
          />
        </Grid>
        <Grid container item lg={6} sm={6}>
          <FormControl>
            <InputLabel shrink htmlFor="min-price-filter">
              Tối thiểu
            </InputLabel>
            <InputBase
              id="min-price-filter"
              value={price.min}
              type="number"
              onChange={handleChange('min')}
              fullWidth
              classes={{
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput
              }}
              startAdornment={
                <InputAdornment position="start" className={classes.adornment}>
                  đ
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid container item lg={6} sm={6}>
          <FormControl>
            <InputLabel shrink htmlFor="max-price-filter">
              Tối đa
            </InputLabel>
            <InputBase
              id="max-price-filter"
              value={price.max}
              type="number"
              onChange={handleChange('max')}
              fullWidth
              classes={{
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput
              }}
              startAdornment={
                <InputAdornment position="start" className={classes.adornment}>
                  đ
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: '15px' }}>
        <Grid item xs={6}>
          <ButtonGlobal
            height="35px"
            fontSize="14px"
            background="white"
            textColor="#000"
            onClick={handleClose}>
            {t('home:chooseGuestRoom:close')}
          </ButtonGlobal>
        </Grid>
        <Grid item xs={6}>
          <ButtonGlobal onClick={hanldeSubmit} height="35px" fontSize="14px" color="primary">
            {t('home:chooseGuestRoom:apply')}
          </ButtonGlobal>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(ActionRangePrice);
