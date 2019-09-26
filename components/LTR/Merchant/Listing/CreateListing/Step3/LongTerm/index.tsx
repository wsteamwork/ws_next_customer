import React, { Fragment, FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Typography, TextField, InputAdornment, Divider } from '@material-ui/core';
import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';

interface IProps {
  classes?: any
}

interface ValuesPrice {
  priceBasic: number;
  price1_3: number;
  price3_6: number;
  price12: number;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    title:{
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '1.375em',
      color: 'rgb(118, 118, 118)',
    },
    bigTitle:{
      margin:'32px 0'
    },
    divider:{
      margin:'16px 0'
    }
  })
);

const LongTerm: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const [price, setPrice] = useState<ValuesPrice>({
    priceBasic: null,
    price1_3: null,
    price3_6: null,
    price12: null,
  });

  const handleChange = (name: keyof ValuesPrice) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice({
      ...price,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <div>
        <h1 className={classes.bigTitle}>
          Giá cơ bản
        </h1>

        <Grid container justify='center'>
          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Giá theo tháng
            </Typography>

            <Typography className={classes.subTitle} variant='subtitle2' gutterBottom>
              Đây là giá tối thiểu 1 tháng (chưa tính hóa đơn).
            </Typography>

            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              value={price.priceBasic}
              onChange={handleChange('priceBasic')}
              InputProps={{
                inputComponent: NumberFormatCustom as any,
                startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </div>

      <div>
        <h1 className={classes.bigTitle}>
          Giá theo kì hạn
        </h1>

        <Grid container justify='center'>
          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Kì hạn 1 - 3 tháng
            </Typography>
            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              value={price.price1_3}
              onChange={handleChange('price1_3')}
              InputProps={{
                inputComponent: NumberFormatCustom as any,
                startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
              }}
            />
            <Divider className={classes.divider}/>
          </Grid>

          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Kì hạn 3 - 6 tháng
            </Typography>

            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              value={price.price3_6}
              onChange={handleChange('price3_6')}
              InputProps={{
                inputComponent: NumberFormatCustom as any,
                startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
              }}
            />
            <Divider className={classes.divider}/>
          </Grid>

          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Kì hạn từ 1 năm trở lên
            </Typography>

            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              value={price.price12}
              onChange={handleChange('price12')}
              InputProps={{
                inputComponent: NumberFormatCustom as any,
                startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LongTerm;
