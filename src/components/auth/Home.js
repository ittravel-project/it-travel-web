import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import { green } from '@material-ui/core/colors';
import PostGridList from '../misc/PostGridList'
import UserGridList from '../misc/UserGridList'
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
    width: '100%',
    position: 'relative',
    minHeight: 200,
    height: '100vh'
    
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    marginBottom: '15%'
  },
  tabsStyle: {
    backgroundColor: 'rgb(183, 214, 229)'
  },
  tabStyle: {
    fontWeight: "bold",
    color: 'rgb(16, 50, 111)',
    // borderTop: "2px solid"

  },
  swipeStyle: {
    overflowY: "scroll",
    height: "59.5%",
    backgroundColor: "rgb(242, 235, 202)"
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
        }
    ];

    return (
        <div className={classes.root}>
             <img src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1233&q=80' alt='' className="home-top-image"/>
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            className={classes.tabsStyle}
            >
            <Tab label="Destinations" className={classes.tabStyle} />
            <Tab label="Travelers" className={classes.tabStyle} />
            {/* <Tab label="Favorites" /> */}
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
            className={classes.swipeStyle}
        >
            <TabContainer dir={theme.direction}>
              <PostGridList />
            </TabContainer>

            <TabContainer dir={theme.direction}>
              <UserGridList />
            </TabContainer>
{/* 
            <TabContainer dir={theme.direction}>Item Three</TabContainer> */}

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
            <Fab aria-label={fab.label} className={fab.className} color={fab.color} href="/posts/new">
                {fab.icon}
            </Fab>
            </Zoom>
        ))}
          <NavBar />
      </div>
    );
}


export default Home