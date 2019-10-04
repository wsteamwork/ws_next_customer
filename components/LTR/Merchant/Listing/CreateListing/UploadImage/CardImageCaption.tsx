import React, { FC, Fragment, useState, ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme, Typography, Grid, TextField } from '@material-ui/core';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ImageReducerAction } from '@/store/Redux/Reducers/LTR/CreateListing/Step2/images';
import { useTranslation } from 'react-i18next';

interface IProps {
  classes?: any;
  label?: string;
  subLabel?: string;
  arrImage: any;
  typeImage?: number;
  typeUpload: { type: any };
  type_txt?: string;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    wrapper: {
      marginBottom: theme.spacing(3)
    },
    textField: {
      width: '100%'
    },
    cardContent: {
      padding: '0 10px',
      '&:last-child': {
        paddingBottom: 0
      }
    },
    card: {
      // boxShadow: 'none'
    },
    media: {
      height: (props) => (props.typeImage === 1 || props.typeImage === 4 ? 250 : 250),
      border: '3px solid #ededed',
      borderRadius: 5
    },
    marginLabel: {
      marginBottom: theme.spacing(2)
    }
  })
);

const CardImageCaption: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const { label, subLabel, arrImage, typeImage, typeUpload, type_txt } = props;
  const dispatch = useDispatch<Dispatch<ImageReducerAction>>();
  const [values, setValues] = useState(arrImage);
  const handleBlur = () => {
    if (type_txt) {
      dispatch({ type: typeUpload.type, payload: { [`${type_txt}`]: { images: values } } });
    } else {
      dispatch({ type: typeUpload.type, payload: { images: values } });
    }
  };
  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    values[index].caption = event.target.value;
    setValues(values);
  };

  return (
    <Fragment>
      <Grid className={classes.wrapper}>
        <Grid container className={classes.marginLabel}>
          <section>
            <Typography variant="h1" className="label main_label">
              {label}
            </Typography>
            <Grid item className="normal_text">
              <span>{subLabel}</span>
            </Grid>
          </section>
        </Grid>
        <Grid container spacing={3}>
          {values.map((img, index) => (
            <Grid item xs={12} sm={typeImage === 1 || typeImage === 4 ? 12 : 6} key={index}>
              <Card className={classes.card}>
                {/* <img src={IMAGE_STORAGE_LG + img.name + '.jpg'} className="media" alt={`Ảnh đại diện`} /> */}
                <CardMedia
                  className={classes.media}
                  image="https://a0.muscache.com/im/pictures/d1daeb37-7f48-4f49-941a-34f840c2db94.jpg?aki_policy=x_large"
                  title="Image"
                />
                <CardContent className={classes.cardContent}>
                  <TextField
                    id="standard-multiline-flexible"
                    label=""
                    placeholder={t('details:images:addCaption')}
                    multiline
                    rows="1"
                    rowsMax="4"
                    defaultValue={values[`${index}`].caption}
                    onChange={handleChange(index)}
                    onBlur={handleBlur}
                    className={classes.textField}
                    margin="normal"
                    InputProps={{
                      disableUnderline: true
                    }}
                    inputProps={{
                      style: { lineHeight: 1.5 }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CardImageCaption;
