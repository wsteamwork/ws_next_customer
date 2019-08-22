import React, { Fragment, FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Typography } from '@material-ui/core';
import NavHeader from '@/components/Toolbar/NavHeader';
import Footer from '@/components/Layout/FooterComponent';
import GridContainer from '@/components/Layout/Grid/Container';
import { useTranslation } from 'react-i18next';
import SearchComponent from '@/components/Home/SearchComponent';
import ButtonGlobal from '@/components/ButtonGlobal';
import { GlobalContext } from '@/store/Context/GlobalContext';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    img404: {
      // maxHeight: '60vh',
      width: '70%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: 4,
      cursor:'pointer',
      MozTransition: 'all 0.5s',
      WebkitTransition: 'all 0.5s',
      transition: 'all 0.5s',
      '&:hover': {
        MsTransform: 'scale(1.005)' /* IE 9 */,
        WebkitTransform: 'scale(1.005)' /* Safari 3-8 */,
        transform: 'scale(1.005)'
      },
    },
    boxImage:{
      textAlign:'center',
    },
    boxBtn:{
      margin:'40px 0'
    }
  })
);

const NotFoundResource: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const {t} = useTranslation();
  const {router} = useContext(GlobalContext);

  const goHome=()=>{
    router.push('/');
  };

  return (
    <Fragment>
      <NavHeader/>
      <GridContainer
        xs={11}
        md={10}
        classNameItem="searchRooms__overlay"
        className="searchRooms">
        <SearchComponent showGuestRoom/>
      </GridContainer>

      <GridContainer xs={11} lg={10} xl={9}>
        <div className={classes.boxImage}>
          <img
            src='/static/images/image-notFound-resource.jpg'
            alt='Westay - Homestay cho người việt'
            className={classes.img404}
          />
          <Typography variant='h6'>
            {t('room:notFoundResource')}
          </Typography>


          <div className={classes.boxBtn}>
            <ButtonGlobal onClick={goHome}>
              {t('room:goBackHome')}
            </ButtonGlobal>
          </div>

        </div>
      </GridContainer>
      <Footer/>
    </Fragment>
  );
};

export default NotFoundResource;
