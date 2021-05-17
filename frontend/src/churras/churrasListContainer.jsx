import React from 'react'
import { makeStyles, AppBar, Tabs, Tab, Box, Typography, Link, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import ChurrasList from './churrasList'
import ImgSad from '../img/sad1.png'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'absolute',
        width: '100%',
    },
    root: {
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        flexGrow: 1,
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '100px',
    },
    initialPageVisible: {
        visibility: 'visible',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    initialPageHidden: {
        visibility: 'hidden'
    },
    h6: {
        marginBottom: '20px',
        marginTop: '80px',
    },
    btnAdd: {
        position: 'absolute',
        right: '15px',
        bottom: '15px',
    },
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default props => {
    const classes = useStyles();
    if (props.lista.length === 0) {
        return (
            <div className={props.lista.length === 0 ? classes.initialPageVisible : classes.initialPageHidden} >
                <AppBar position="static" color='default' className={classes.appBar}>
                    <Tabs value={0} aria-label="simple tabs example" indicatorColor="primary">
                        <Tab label="Agenda de Churras" {...a11yProps(0)} />
                    </Tabs>
                </AppBar>
                <Typography variant="h6" className={classes.h6}>
                    Ainda não há agenda de churrasco
                </Typography>
                <img src={ImgSad} />
                <div className={classes.btnAdd}>
                    <Link href="#/churras-add">
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Link>
                </div>
            </div>

        )
    } else {
        return (
            <div className={classes.root}>
                <AppBar position="static" color='default' className={classes.appBar}>
                    <Tabs value={0} aria-label="simple tabs example" indicatorColor="primary">
                        <Tab label="Agenda de Churras" {...a11yProps(0)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={0} index={0} className={classes.card}>
                    <ChurrasList lista={props.lista} removeEvento={props.removeEvento}
                    />
                </TabPanel>

            </div>
        )
    }
}