import React, { Fragment, FC, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography, Grid, Box, RadioGroup } from '@material-ui/core';
import GridContainer from '@/components/Layout/Grid/Container';
import RadioCustom from '@/components/LTR/ReusableComponents/RadioCustom';
import FormControl from '@material-ui/core/FormControl';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxImgIntro:{
      backgroundImage: `url('../../../static/images/img_intro.jpg')`,
      width:'100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      backgroundColor: '#f5f6f8',
      padding: '32px'
    },
    boxFeature:{
      padding: '32px'
    },
    imgType:{
      width: 300,
      height: 225,
      objectFit:'cover',
      borderRadius: 16,
      WebkitFilter: 'grayscale(100%)',
      filter: 'grayscale(100%)',
      WebkitTransition: '.3s ease-in-out',
      transition: '.3s ease-in-out',
      cursor: 'pointer',
      '&:hover':{
        WebkitFilter: 'grayscale(0)',
        filter: 'grayscale(0)',
      }
    }
  })
);

const CreateListing: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const [selectedValue, setSelectedValue] = useState<number>(null);

  const handleChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
    setSelectedValue(parseInt((event.target as HTMLInputElement).value));
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <div className={classes.boxImgIntro}>
          <a href = '/'>
            <img src = '../../../static/images/Logo-westay.png' alt = 'westay.vn' width={150}/>
          </a>
        </div>
      </Grid>
      <Grid item xs={8}>
        <Box p={4}>
          <Typography variant='h4' style={{fontWeight:'bold'}}>Bạn muốn bắt đầu như thế nào?</Typography>
        </Box>
        <Grid container justify='space-around'>
          <div>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup value={String(selectedValue)} onChange={handleChange} row>
                <Grid container spacing={2} justify='center'>
                  <Grid item xs={12}>
                    <RadioCustom
                      border={false}
                      label='Tạo mới một tòa nhà'
                      descr={
                        <div>
                          <Typography variant='subtitle1' gutterBottom>Điều này là cần thiết khi bạn sở hữu nhiều căn hộ trong cùng một tòa nhà</Typography>
                          <img src = '../../../static/images/apartment.jpg' alt = 'westay.vn' className={classes.imgType}/>
                        </div>
                      }
                      value={String(0)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <RadioCustom
                      border={false}
                      label='Tạo mới căn hộ'
                      descr={
                        <div>
                          <Typography variant='subtitle1' gutterBottom>Lựa chọn này khi bạn có những căn hộ riêng biệt</Typography>
                          <img src = '../../../static/images/studio.jpg' alt = 'westay.vn' className={classes.imgType}/>
                        </div>
                      }
                      value={String(1)}
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateListing;
