// import React, { Fragment } from 'react';
// //import { Redirect } from 'react-router-dom';
// //import authService from '../../services/AuthService';
// //import {withAuthConsumer} from '../../contexts/AuthStore'
// import NavBar from '../misc/NavBar'
// import SearchBar from '../misc/SearchBar'
// import queryString from 'query-string'

// class Home extends React.Component {

//     render() {
//         return(
//             <Fragment>
//                 <div className='Home-image'>
//                     <img src='https://img.jakpost.net/c/2018/01/11/2018_01_11_38768_1515668901._large.jpg' width='420px' height='200px'/>
//                 </div>
//                 <div className="d-flex justify-content-around">
//                     <button className="btn-success col-4 p-2"></button>
//                     <button className="btn-success col-4 p-2"></button>
//                 </div>
//                 <SearchBar queryString={queryString} />
//                 <div className='row'> 
//                     <div className='p-4 bg-light border-right rounded'>
//                         <div className='row'>
//                         <div className="card">
//                             <img className="card-img-top" src="..." alt="Card image cap" />
//                             <div className="card-body">
//                                 <h5 className="card-title">Card title</h5>
//                                 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                 <a href="#" className="btn btn-primary">Go somewhere</a>
//                             </div>
//                         </div>
//                         <div className="card">
//                                 <img className="card-img-top" src="..." alt="Card image cap" />
//                             <div className="card-body">
//                                 <h5 className="card-title">Card title</h5>
//                                 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                 <a href="#" className="btn btn-primary">Go somewhere</a>
//                             </div>
//                         </div>
//                         </div>
                        
//                     </div>
//                 </div>
//                 <NavBar /> 
//         </Fragment>
//         )
//     }
// }

// export default Home 



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
import GridList from '../misc/GridList'
import SearchBar from '../misc/SearchBar'
import queryString from 'query-string'



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
            <Tab label="Favorites" />
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabContainer dir={theme.direction}>
              <SearchBar queryString={queryString} />
              <GridList />
            </TabContainer>
            <TabContainer dir={theme.direction}>Item Two</TabContainer>
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
        </div>
    );
}


export default Home