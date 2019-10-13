import { CreateListingActions } from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import { FormControlLabel, FormGroup } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Dispatch, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import classNames from 'classnames';

interface IProps {
  classes?: any;
  value?: any;
  error?: any;
  label?: any;
  className?: any;
  id?: any;
  touched?: any;
  onChange?: any;
  onBlur?: any;
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

const InputFeedback = ({ error }) =>
  error ? <div className={classNames('input-feedback')}>{error}</div> : null;

const CheckboxGroup: FC<IProps> = (props) => {
  const { value, error, touched, label, className, children, onChange, onBlur, id } = props;
  // const dispatch = useDispatch<Dispatch<CreateListingActions>>();
  // const leaseType = useSelector<ReducersList, string[]>((state) => state.createListing.leaseType);
  const classes = useStyles(props);
  // const [state, setState] = useState<any>({
  //   shortterm: true,
  //   longterm: false
  // });
  // const { shortterm, longterm } = state;
  //   const handleChange = (name) => (event) => {
  //     setState({ ...state, [name]: event.target.checked });
  //   };

  const handleChange = (event) => {
    const target = event.currentTarget;
    console.log(value);
    console.log(target.id);
    console.log(target.checked);
    let valueArray = [...value] || [];
    // let valueArray = [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }
    // console.log(valueArray);
    console.log('valueArray', valueArray);

    onChange(id, valueArray);
  };

  const handleBlur = () => {
    // take care of touched
    onBlur(id, true);
  };

  return (
    <Grid className={classes.container}>
      {/* <h3>Hình thức thuê: </h3> */}

      <FormControl component="fieldset" fullWidth>
        <Grid className={classes.title}>{label}</Grid>
        <FormGroup row>
          <Grid container spacing={2}>
            {children
              ? React.Children.map(children, (child: any) => {
                  if (child.props) console.log(value.includes(child.props.id));
                  return child.props
                    ? React.cloneElement(child, {
                        field: {
                          value: value.includes(child.props.id),
                          onChange: handleChange,
                          onBlur: handleBlur
                        }
                      })
                    : '';
                })
              : ''}
            {touched && <InputFeedback error={error} />}
            {/* <Grid item xs={6} className={classes.checkboxItem}>
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
            </Grid>*/}
          </Grid>
        </FormGroup>
      </FormControl>
    </Grid>
  );
};

export default CheckboxGroup;
