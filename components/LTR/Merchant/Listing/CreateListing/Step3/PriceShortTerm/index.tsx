import React, { Fragment, FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Typography, TextField, InputAdornment, Divider } from '@material-ui/core';
import NumberFormatCustom from '@/components/LTR/ReusableComponents/NumberFormatCustom';

interface IProps {
  classes?: any
}

interface ValuesPrice {
  priceDay: number;
  priceHour: number;
  surchargeAddingPeople: number;
  surchargeOvertime: number;
  cleaningService: number;
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

const PriceShortTerm: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const [price, setPrice] = useState<ValuesPrice>({
    priceDay: null,
    priceHour: null,
    surchargeAddingPeople: null,
    surchargeOvertime: null,
    cleaningService: null,
  });

  const handleChange = (name: keyof ValuesPrice) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice({
      ...price,
      [name]: event.target.value,
    });
  };

  return (
    <Grid container>
      <div>
        <h1 className={classes.bigTitle}>
          Giá cơ bản
        </h1>

        <Grid container justify='center'>
          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Giá theo ngày
            </Typography>

            <Typography className={classes.subTitle} variant='subtitle2' gutterBottom>
              Đây là giá cơ bản cho một ngày. Nếu không phụ thu thêm giá khác, giá này sẽ được áp dụng cho tất cả các ngày trong căn hộ của bạn.
            </Typography>

            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              value={price.priceDay}
              onChange={handleChange('priceDay')}
              InputProps={{
                inputComponent: NumberFormatCustom as any,
                startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
              }}
            />
            <Divider className={classes.divider}/>
          </Grid>

          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Giá theo giờ
            </Typography>

            <Typography className={classes.subTitle} variant='subtitle2' gutterBottom>
              Đây là giá cơ bản cho một ngày. Nếu không phụ thu thêm giá khác, giá này sẽ được áp dụng cho tất cả các ngày trong căn hộ của bạn.
            </Typography>

            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              value={price.priceHour}
              onChange={handleChange('priceHour')}
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
          Giá phụ thu
        </h1>

        <Grid container justify='center'>
          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Phụ thu khi thêm người
            </Typography>

            <Typography className={classes.subTitle} variant='subtitle2' gutterBottom>
              Đây là giá phụ thu khi tăng thêm mỗi khách, hệ thống sẽ tự động tính vào tiền đặt căn hộ của khách. Số người tối đa bạn cho phép ở trong căn hộ: 4
            </Typography>

            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              value={price.surchargeAddingPeople}
              onChange={handleChange('surchargeAddingPeople')}
              InputProps={{
                inputComponent: NumberFormatCustom as any,
                startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
              }}
            />
            <Divider className={classes.divider}/>
          </Grid>

          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Phụ thu khi khách ở thêm giờ
            </Typography>

            <Typography className={classes.subTitle} variant='subtitle2' gutterBottom>
              Đây là giá phụ thu khi khách đặt thêm giờ, bắt đầu từ sau 4 giờ, cứ mỗi giờ tiếp theo hệ thống sẽ tự động tính vào tiền đặt căn hộ của khách.
            </Typography>

            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              value={price.surchargeOvertime}
              onChange={handleChange('surchargeOvertime')}
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
          Phí dọn dẹp
        </h1>

        <Grid container justify='center'>
          <Grid item xs={11}>
            <Typography className={classes.title} variant='h6' gutterBottom>
              Phụ thu dịch vụ dọn dẹp
            </Typography>

            <Typography className={classes.subTitle} variant='subtitle2' gutterBottom>
              Đây là giá phụ thu dọn dẹp sau khi khách checkout, để thu hút khách chúng tôi khuyên bạn nên thiết lập giá này sau.
            </Typography>

            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              value={price.cleaningService}
              onChange={handleChange('cleaningService')}
              InputProps={{
                inputComponent: NumberFormatCustom as any,
                startAdornment: <InputAdornment position="start"> đ </InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default PriceShortTerm;
