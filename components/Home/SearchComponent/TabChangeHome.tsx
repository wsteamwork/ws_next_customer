import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Tabs, Tab } from '@material-ui/core';
import { TabsProps } from '@material-ui/core/Tabs';
import { a11yProps } from '@/pages/host/update-listing/[id]';

interface IProps extends TabsProps {
  classes?: any,
  tab: testTab[],
}

interface testTab {
  label: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root: {
      top: '-7vh',
      position: 'absolute'
    },
    indicator: {
      height: '100%',
      borderRadius: 4,
      zIndex: -1,
    },
    rootTab: {
      textTransform: 'initial',
      margin: '0 8px 0 0',
      minWidth: 0,
      [theme.breakpoints.up('md')]: {
        minWidth: 0
      },
      backgroundColor: 'rgba(225,225,225, 0.5)',
      borderRadius: 4,
      opacity:0.9,
      padding: '0 24px'
    },
    wrapper: {
      letterSpacing: 0.5,
      color: '#323232',
      fontWeight: 700,
      fontSize: 18,
      [theme.breakpoints.only('xs')]:{
        fontSize: 16,
      }
    }
  })
);

const TabChangeHome: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { tab } = props;

  return (
    <Tabs
      {...props}
      classes = {{
        root: classes.root,
        indicator: classes.indicator
      }}
    >
      {tab.map((proptab, i) =>
        <Tab key = {i} {...proptab}
             classes = {{
               root: classes.rootTab,
               wrapper: classes.wrapper
             }}
             {...a11yProps(i)}
        />
      )}
    </Tabs>
  );
};

TabChangeHome.defaultProps = {
  tab: []
};

export default TabChangeHome;
