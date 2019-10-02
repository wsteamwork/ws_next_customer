import React, {
  FC,
  Fragment,
  useState,
  ChangeEvent
} from 'react';
import { createStyles, makeStyles, Theme, Typography, Grid, TextField } from '@material-ui/core';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

interface IProps {
  classes?: any;
  label?: string;
  subLabel?: string;
  arrImage: any;
  typeImage?: number;
}
const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    wrapper: {
      marginBottom: theme.spacing(3)
    },
    textField: {
      width: '100%',
    },
    cardContent: {
      padding: '0 0',
      '&:last-child': {
        paddingBottom: 0
      }
    },
    card: {
      boxShadow: 'none'
    },
    media: {
      height: (props) => props.typeImage === 1 ? 250 : 170,
      border: '1px solid #ededed',
      borderRadius: 5
    },
    marginLabel: {
      marginBottom: theme.spacing(2)
    }
  })
);

const CardImageCaption: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { label, subLabel, arrImage, typeImage } = props;


  const [values, setValues] = useState(arrImage);
  const handleChange = (index) => (event: ChangeEvent<HTMLInputElement>) => {
    // values = {...values[index], caption: event.target.value};
    // values.splice(0,index,v);
    // setValues(values);
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
        {arrImage.map((img, index) => (
          <Grid item xs={typeImage === 1 || typeImage === 4 ? 12 : 4 } key={index}>
            <Card className={classes.card}>
              {/* <img src={IMAGE_STORAGE_LG + img.name + '.jpg'} className="media" alt={`Ảnh đại diện`} /> */}
              <CardMedia
                className={classes.media}
                image="https://a0.muscache.com/im/pictures/d1daeb37-7f48-4f49-941a-34f840c2db94.jpg?aki_policy=x_large"
                title="Paella dish"
              />
              <CardContent className={classes.cardContent}>
                <TextField
                  id="standard-multiline-flexible"
                  label=""
                  placeholder="Thêm chú thích"
                  multiline
                  rows="1"
                  rowsMax="4"
                  value={values[`${index}`].caption}
                  onChange={handleChange(index)}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    disableUnderline: true,
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
