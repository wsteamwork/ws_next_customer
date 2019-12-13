import React, { FC, useState, SyntheticEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Box } from '@material-ui/core';
import CreateApartmentForListing from '@/components/LTR/Merchant/Listing/CreateListing/CreateApartment';
import CardWrapperUpdate from '@/components/LTR/Merchant/Listing/UpdateListing/CardWrapperUpdate';
import GridContainer from '@/components/Layout/Grid/Container';

interface IProps {
  classes?: any;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    boxImgIntro: {
      backgroundImage: `url('../../../static/images/img_intro.jpg')`,
      width: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '100vh',
      backgroundColor: '#f5f6f8',
      padding: '32px'
    },
    boxFeature: {
      padding: '32px'
    },
    imgType: {
      width: 300,
      height: 225,
      objectFit: 'cover',
      borderRadius: 16,
      WebkitFilter: 'grayscale(100%)',
      filter: 'grayscale(100%)',
      WebkitTransition: '.3s ease-in-out',
      transition: '.3s ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        WebkitFilter: 'grayscale(0)',
        filter: 'grayscale(0)'
      }
    }
  })
);

const CreateApartment: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageSnack, setMessageSnack] = useState<string>('Cập nhật thành công');
  const [statusSnack, setStatusSnack] = useState<string>('success');
  const UpdateAvatar: any = () => {
    console.log(1);
  };

  const handleCloseSnack = (event?: SyntheticEvent, reason?: string) => {
    console.log(2);
  };
  return (
    <Grid container>
      <Grid item xs={4}>
        <div className={classes.boxImgIntro}>
          <a href="/">
            <img src="../../../static/images/Logo-westay.png" alt="westay.vn" width={150} />
          </a>
        </div>
      </Grid>
      <Grid item xs={8}>
        {/* <CardWrapperUpdate
          // widthMd={8}
          // widthLg={6}
          handleSave={UpdateAvatar}
          openSnack={openSnack}
          messageSnack={messageSnack}
          statusSnack={statusSnack}
          handleCloseSnack={handleCloseSnack}> */}
        <Box pl={14} pt={5}>
          <CreateApartmentForListing />
        </Box>
        {/* </CardWrapperUpdate> */}
      </Grid>
    </Grid>
  );
};

export default CreateApartment;
