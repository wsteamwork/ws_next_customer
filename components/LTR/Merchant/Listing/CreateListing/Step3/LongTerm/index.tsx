import React, { Fragment, FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Typography, TextField, InputAdornment, Divider, Button } from '@material-ui/core';
import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';
import ServiceFee from '@/components/LTR/Merchant/Listing/CreateListing/Step3/ServiceFee';

interface IProps {
  classes?: any
}

interface ValuesPrice {
  priceBasic: number;
  price2_3: number;
  price3_6: number;
  price6_12: number;
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
      margin:'24px 0'
    },
    divider:{
      margin:'32px 0'
    },
    rowMargin:{
      marginTop:12
    },
    btnTip:{
      padding: '0px 8px',
      minWidth:0,
      '&:hover':{
        textDecoration: 'underline',
      }
    },
    txtPercent:{
      color:'tomato'
    }
  })
);

const LongTerm: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const [price, setPrice] = useState<ValuesPrice>({
    priceBasic: null,
    price2_3: null,
    price3_6: null,
    price6_12: null,
    price12: null,
  });
  const [pricePercent, setPricePercent] = useState<ValuesPrice>({
    priceBasic: null,
    price2_3: null,
    price3_6: null,
    price6_12: null,
    price12: null,
  });

  const handleChange = (name: keyof ValuesPrice) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice({
      ...price,
      [name]: event.target.value,
    });
    setPricePercent({
      ...pricePercent,
      [name]: 100 - (parseInt(event.target.value) / price.priceBasic * 100),
    })
  };

  const handleTip = (typePrice: keyof ValuesPrice, percent: number) => {
    setPrice({
      ...price,
      [typePrice]: price.priceBasic - (price.priceBasic * percent),
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
              Giá theo tháng (chưa tính hóa đơn)
            </Typography>

            <Typography className={classes.subTitle} variant='subtitle2' gutterBottom>
              Đây là giá tối thiểu từ 1 tháng - 2 tháng
            </Typography>

            <TextField
              variant="outlined"
              value={price.priceBasic}
              onChange={handleChange('priceBasic')}
              InputProps={{
                inputComponent: NumberFormatCustom as any,
                startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
              }}
            />

            <div className={classes.rowMargin}>
              <span>Gợi ý: </span>
              <Button color='primary' className={classes.btnTip} >
                10.000.000
              </Button>
              <span> là giá trung bình của khu vực Ba Đình </span>
            </div>
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
              Kì hạn 2 - 3 tháng
            </Typography>

            <Grid container spacing={4} alignItems='center'>
              <Grid item >
                <TextField
                  disabled={!price.priceBasic}
                  variant="outlined"
                  value={price.price2_3}
                  onChange={handleChange('price2_3')}
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                    startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
                  }}
                />
              </Grid>
              {price.price2_3 && (
                <Grid item xs>
                  <Typography className={classes.txtPercent}>Giảm {pricePercent.price2_3}% so với giá cơ bản </Typography>
                </Grid>
              )}
            </Grid>

            <div className={classes.rowMargin}>
              <span>Gợi ý: </span>
              <Button color='primary' className={classes.btnTip} disabled={!price.priceBasic}
                      onClick={()=>handleTip('price2_3', 0.05)}>
                5%
              </Button>
              <span> là mức giảm trung bình cần thiết để khuyến khích khách hàng thuê phòng theo kì hạn này </span>
            </div>
            <Divider className={classes.divider}/>
          </Grid>
          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Kì hạn 3 - 6 tháng
            </Typography>

            <Grid container spacing={4} alignItems='center'>
              <Grid item >
                <TextField
                  disabled={!price.priceBasic}
                  variant="outlined"
                  value={price.price3_6}
                  onChange={handleChange('price3_6')}
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                    startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
                  }}
                />
              </Grid>
              {price.price3_6 && (
                <Grid item xs>
                  <Typography className={classes.txtPercent}>Giảm {pricePercent.price3_6}% so với giá cơ bản </Typography>
                </Grid>
              )}
            </Grid>

            <div className={classes.rowMargin}>
              <span>Gợi ý: </span>
              <Button color='primary' className={classes.btnTip} disabled={!price.priceBasic}
                      onClick={()=>handleTip('price3_6', 0.05)}>
                5%
              </Button>
              <span> là mức giảm trung bình cần thiết để khuyến khích khách hàng thuê phòng theo kì hạn này </span>
            </div>
            <Divider className={classes.divider}/>
          </Grid>

          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Kì hạn 6 - 12 tháng
            </Typography>

            <Grid container spacing={4} alignItems='center'>
              <Grid item >
                <TextField
                  disabled={!price.priceBasic}
                  variant="outlined"
                  value={price.price3_6}
                  onChange={handleChange('price3_6')}
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                    startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
                  }}
                />
              </Grid>
              {price.price3_6 && (
                <Grid item xs>
                  <Typography className={classes.txtPercent}>Giảm {pricePercent.price3_6}% so với giá cơ bản </Typography>
                </Grid>
              )}
            </Grid>
            <div className={classes.rowMargin}>
              <span>Gợi ý: </span>
              <Button color='primary' className={classes.btnTip} disabled={!price.priceBasic}
                      onClick={()=>handleTip('price3_6', 0.1)}>
                10%
              </Button>
              <span> là mức giảm trung bình cần thiết để khuyến khích khách hàng thuê phòng theo kì hạn này </span>
            </div>
            <Divider className={classes.divider}/>
          </Grid>

          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Kì hạn từ 1 năm trở lên
            </Typography>

            <Grid container spacing={4} alignItems='center'>
              <Grid item >
                <TextField
                  disabled={!price.priceBasic}
                  variant="outlined"
                  value={price.price12}
                  onChange={handleChange('price12')}
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                    startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
                  }}
                />
              </Grid>
              {price.price12 && (
                <Grid item xs>
                  <Typography className={classes.txtPercent}>Giảm {pricePercent.price12}% so với giá cơ bản </Typography>
                </Grid>
              )}
            </Grid>
            <div className={classes.rowMargin}>
              <span>Gợi ý: </span>
              <Button color='primary' className={classes.btnTip} disabled={!price.priceBasic}
                      onClick={()=>handleTip('price12', 0.15)}>
                15%
              </Button>
              <span> là mức giảm trung bình cần thiết để khuyến khích khách hàng thuê phòng theo kì hạn này </span>
            </div>
          </Grid>
        </Grid>
      </div>

      <ServiceFee/>
    </div>
  );
};

export default LongTerm;
