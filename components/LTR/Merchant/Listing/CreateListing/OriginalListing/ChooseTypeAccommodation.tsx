import ButtonGlobal from '@/components/ButtonGlobal';
import RadioCustom from '@/components/LTR/ReusableComponents/RadioCustom';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { Box, Grid, RadioGroup, Theme, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { FC, useContext, useState } from 'react';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    imgType: {
      width: 300,
      height: 225,
      objectFit: 'cover',
      borderRadius: 16,
      WebkitFilter: 'grayscale(100%)',
      filter: 'grayscale(100%)',
      WebkitTransition: '.3s ease-in-out',
      MozTransition: '.3s ease-in-out',
      transition: '.3s ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        WebkitFilter: 'grayscale(0) !important',
        filter: 'grayscale(0) !important'
      }
    },
    chooseType: {
      WebkitFilter: 'grayscale(0) !important',
      filter: 'grayscale(0) !important',
      MsTransform: 'scale(1.02)' /* IE 9 */,
      WebkitTransform: 'scale(1.02)' /* Safari 3-8 */,
      transform: 'scale(1.02)'
    }
  })
);

const ChooseTypeAccommodation: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { } = props;
  const [typeAccommodation, setTypeAccommodation] = useState<number>(null);
  const { router } = useContext(GlobalContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeAccommodation(parseInt((event.target as HTMLInputElement).value));
  };

  const imageChange = (value: number) => {
    setTypeAccommodation(value);
  };

  const handleSubmit = () => {
    if (typeAccommodation) {
      router.push('/host/create-listing/house');
    } else {
      router.push('/host/create-listing/apartment');
    }
  };

  return (
    <Box p={4}>
      <Box mb={4}>
        <Typography variant='h4' style={{ fontWeight: 'bold' }}>Bạn muốn bắt đầu như thế nào?</Typography>
      </Box>
      <FormControl component='fieldset' fullWidth>
        <RadioGroup value={String(typeAccommodation)} onChange={handleChange} row>
          <Grid container spacing={2} justify='center'>
            <Grid item xl={10} xs={12}>
              <RadioCustom
                noneBorder
                label='Tạo mới một tòa nhà'
                descr={
                  <div>
                    <Typography variant='subtitle1' gutterBottom>Điều này là cần thiết khi bạn sở hữu nhiều căn hộ
                                                                   trong cùng một tòa nhà</Typography>
                    <img src='../../../static/images/apartment.jpg' alt='westay.vn'
                      onClick={() => imageChange(0)}
                      className={classNames(classes.imgType, typeAccommodation
                        === null ? '' : typeAccommodation ? '' : classes.chooseType)} />
                  </div>
                }
                value={String(0)}
              />
            </Grid>
            <Grid item xl={10} xs={12}>
              <RadioCustom
                noneBorder
                label='Tạo mới căn hộ'
                descr={
                  <div>
                    <Typography variant='subtitle1' gutterBottom>Lựa chọn điều này khi bạn có những căn hộ riêng
                                                                   biệt hoặc đã tạo sẵn các tòa nhà trước đó.</Typography>
                    <img src='../../../static/images/studio.jpg' alt='westay.vn'
                      onClick={() => imageChange(1)}
                      className={classNames(classes.imgType, typeAccommodation ? classes.chooseType : '')} />
                  </div>
                }
                value={String(1)}
              />
            </Grid>

            <Grid item xl={6}>
              <Box mt={5} textAlign='right'>
                <ButtonGlobal disabled={typeAccommodation === null} onClick={handleSubmit}>
                  Khởi tạo
                </ButtonGlobal>
              </Box>
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ChooseTypeAccommodation;
