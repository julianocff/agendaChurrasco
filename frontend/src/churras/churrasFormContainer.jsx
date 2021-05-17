import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab, makeStyles, Box, CircularProgress } from "@material-ui/core";

import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ChurrasForm from "./churrasForm";

const URL = "http://localhost:3003/api/churrastrinca";

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
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        width: "100%",
        position: "absolute",
    },
    root: {
        flexGrow: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "0px",
        paddingRight: "0px",
    },
}));

export default function ChurrasFormContainer() {
    const classes = useStyles();

    const history = useHistory();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        descricao: "",
        observacoes: "",
        data: "",
        valorComBebida: "",
        valorSemBebida: "",
        participantes: [],
    });

    const onSubmit = (payload) => {
        console.log("onSubmit", payload);
        if (id) {
            axios.put(`${URL}/${id}`, payload).then(() => history.push("/churras"));
        } else {
            axios.post(URL, payload).then(() => history.push("/churras"));
        }
    };

    useEffect(() => {
        if (id) {
            setLoading(true);
            axios
                .get(`${URL}/${id}`)
                .then((response) => {
                    setState({ ...response.data, data: response.data.data.slice(0, 10) });
                    setLoading(false);
                })
                .catch((error) => console.error("get", error));
        } else {
            setLoading(false);
        }
    }, [id]);

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.appBar}>
                <Tabs
                    value={0}
                    aria-label="simple tabs example"
                    indicatorColor="primary"
                >
                    <Tab
                        label={id ? "editar churrasco" : "adicionar churrasco"}
                        {...a11yProps(0)}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={0} index={0}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <ChurrasForm onSubmit={onSubmit} state={state} setState={setState} />
                )}
            </TabPanel>
        </div>
    );
}