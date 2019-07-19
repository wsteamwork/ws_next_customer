import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import React, { ComponentType, Fragment, useContext, useEffect, useState, memo } from 'react';
import { compose } from 'recompose';
import Button from '@material-ui/core/Fab/Fab';
import mainColor from '@/styles/constants/colors';
const styles: any = () => createStyles({
    toTop: {
        position: 'fixed',
        zIndex: 9,
        backgroundColor: mainColor.success
    },
});

interface IProps extends Partial<WithStyles<typeof styles>> {

}

// @ts-ignore
const ToTheTop: ComponentType<IProps> = (props: IProps) => {
    const { classes } = props;

    return (
        <Fragment>
            <Button
                className={classes.toTop}
            >
                <img src='/static/up-arrow.svg' alt='To Top' width='30px' height='30px' />
            </Button>
        </Fragment>
    );
};

export default compose<IProps, any>(
    withStyles(styles),
    memo,
)(ToTheTop);
