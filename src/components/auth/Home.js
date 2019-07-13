import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import PostGridList from '../misc/PostGridList'
import UserGridList from '../misc/UserGridList'
import SearchBar from '../misc/SearchBar'
import queryString from 'query-string'
import NavBar from '../misc/NavBar'




function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

const Home = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function handleChangeIndex(index) {
        setValue(index);
    }

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
        {color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
        label: 'Add',
        },
        {color: 'secondary',
        className: classes.fab,
        icon: <EditIcon />,
        label: 'Edit',
        },
        {color: 'inherit',
        className: clsx(classes.fab, classes.fabGreen),
        icon: <UpIcon />,
        label: 'Expand',
        },
    ];

    return (
        <div className={classes.root}>
             <img src='https://img.jakpost.net/c/2018/01/11/2018_01_11_38768_1515668901._large.jpg' width='500px' height='200px'/>
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            >
            <Tab label="Destinations" />
            <Tab label="Travelers" />
            {/* <Tab label="Favorites" /> */}
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabContainer dir={theme.direction}>
              <SearchBar queryString={queryString} />
              <PostGridList />
            </TabContainer>

            <TabContainer dir={theme.direction}>
              <UserGridList />
            </TabContainer>

            <TabContainer dir={theme.direction}>Item Three</TabContainer>

        </SwipeableViews>
        {fabs.map((fab, index) => (
            <Zoom
            key={fab.color}
            in={value === index}
            timeout={transitionDuration}
            style={{
                transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
            >
            <Fab aria-label={fab.label} className={fab.className} color={fab.color}>
                {fab.icon}
            </Fab>
            </Zoom>
        ))}

          <NavBar />
        </div>
    );
}


export default Home