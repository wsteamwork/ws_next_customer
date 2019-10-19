import React, { Fragment,FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import {
  Theme,
  Typography,
  Grid
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { formatMoney } from '@/utils/mixins';
import { StyledTableRow, StyledTableCell } from '@/components/Room/BoxRoomDetail/TablePrices';
import { useTranslation } from 'react-i18next';
import { detailPriceLT } from '@/types/Requests/LTR/LTRoom/LTRoom';
import { typeService } from '@/types/Requests/LTR/CreateListing/Step3/ServicesFee';

interface IProps {
  classes?: any,
  prices:detailPriceLT[],
  included_fee: typeService[],
  included_services:string[],
  not_included_services:string[],
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      borderRadius: 8,
      overflow: 'hidden',
    },
    name: {
      fontWeight: 900,
      margin: '1rem 0 1rem 0'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '50%',
      flexShrink: 0,
    },
    expansionPanel: {
      margin: '1px 0 !important'
    }
  })
);

const BoxTablePrices: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {prices, included_fee, not_included_services, included_services} = props;
  const {t} = useTranslation();

  return (
    <Fragment>
      <Typography variant='h5' className={classes.name}>
        {t('room:feeList')}
      </Typography>
      {included_services.length ? (
        <Typography variant='subtitle2' className={classes.subName}>
          Giá đã bao gồm phí : {
          included_services.map((value, index) => (
            <span>{value}{included_services.length !== (index + 1) ? ', ': ''} </span>
          ))
        }
        </Typography>
      ) : (<Fragment />)}


      <Paper className={classes.root} elevation={0}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell> Giá thuê theo kì hạn</StyledTableCell>
              <StyledTableCell align="right"> VND</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prices.map((o,i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {o.term}
                </StyledTableCell>
                <StyledTableCell align="right">{`${formatMoney(o.price)}`}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>

          {included_services.length ? (
            <Fragment>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Phí dịch vụ</StyledTableCell>
                  <StyledTableCell align="right"> VND</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {included_fee.map((o,i) => {
                  if (o.included == 1) {
                    return (
                      <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row">
                          {o.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{o.value == 0 ? 'đã bao gồm trong giá thuê nhà' : `${formatMoney(o.value)}`}</StyledTableCell>
                      </StyledTableRow>
                    )
                  }
                })}
              </TableBody>
            </Fragment>
          ) : (<Fragment/>)}
        </Table>
      </Paper>
    </Fragment>
  );
};

export default BoxTablePrices;
