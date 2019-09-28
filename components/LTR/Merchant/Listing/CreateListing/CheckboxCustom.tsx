import React, { FC, useState, Dispatch, useEffect } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Select from '@/components/ReusableComponents/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { FormGroup, FormControlLabel } from '@material-ui/core';
import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '32px 0'
  },
  checked: {
    color: '#FFA712 !important'
  },
  checkboxItem: {},
  checkboxItemWrapper: {
    padding: '5px 15px 10px',
    border: '1px solid #767676',
    borderRadius: 4
  },
  title: {
    marginBottom: 8,
    overflowWrap: 'break-word',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '1.375em',
    color: 'rgb(118, 118, 118)',
    margin: 0
  }
}));

const CheckboxCustom: FC<IProps> = (props) => {
  const dispatch = useDispatch<Dispatch<CreateListingActions>>();

  const classes = useStyles(props);
  const [state, setState] = useState<any>({
    shortterm: true,
    longterm: false
  });
  const { shortterm, longterm } = state;
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
  };

  useEffect(() => {
    dispatch({
      type: 'SET_LEASE_TYPE',
      payload:
        shortterm && !longterm ? 1 : !shortterm && longterm ? 2 : shortterm && longterm ? 3 : null
    });
  }, [state]);

  const error = [shortterm, longterm].filter((v) => v).length !== 2;

  return (
    <Grid className={classes.container}>
      {/* <h3>Hình thức thuê: </h3> */}

      <FormControl component="fieldset" fullWidth>
        <Grid className={classes.title}>Hình thức thuê</Grid>
        <FormGroup row>
          <Grid container spacing={2}>
            <Grid item xs={6} className={classes.checkboxItem}>
              <div className={classes.checkboxItemWrapper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disableRipple
                      classes={{ checked: classes.checked }}
                      checked={shortterm}
                      onChange={handleChange('shortterm')}
                      value="shortterm"
                    />
                  }
                  label="Ngắn hạn"
                />
                <div style={{ marginTop: 10 }}>Bao gồm theo ngày & giờ</div>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.checkboxItem}>
              <div className={classes.checkboxItemWrapper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disableRipple
                      classes={{ checked: classes.checked }}
                      checked={longterm}
                      onChange={handleChange('longterm')}
                      value="longterm"
                    />
                  }
                  label="Dài hạn"
                />
                <div style={{ marginTop: 5 }}>Thời gian thuê tối thiểu 1 tháng</div>
              </div>
            </Grid>
          </Grid>
        </FormGroup>
      </FormControl>
    </Grid>
  );
};

export default CheckboxCustom;
