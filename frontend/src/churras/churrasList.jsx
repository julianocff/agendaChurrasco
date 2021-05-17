import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Link, Card, Grid, Typography, CardContent, makeStyles, Button, Fab, CardActions } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import PeopleIcon from '@material-ui/icons/People';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles({
    btnAdd: {
        position: 'absolute',
        right: '15px',
        bottom: '15px',
    },
    gridContainer: {
        paddingLeft: '50px',
        paddingRight: '50px',
    },
    obsChurras: {
        fontSize: '.7em'
    },
    card: {
        cursor: 'pointer',
    },
    cardRow: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    cardColumn: {
        display: 'flex',
        alignItems: 'center',
    },
})

const formatDate = (dataString) => {
    if (!dataString) {
        return
    }
    const [, mes, dia] = dataString.slice(0, 10).split('-')
    return `${dia}/${mes}`
}

export default props => {
    const classes = useStyles()
    const lista = props.lista || []
    const history = useHistory();

    const getValorTotal = (churras) => {
        let total = 0
        churras.participantes.forEach((participante) => {
            total += participante.comBebida ? churras.valorComBebida : churras.valorSemBebida
        })
        return total
    }

    return (
        <Grid container spacing={4} className={classes.gridContainer} justify="center">
            {
                lista.map(churras => (
                    <Grid item xs={6} key={churras._id}>
                        <Card
                            className={classes.card}
                            onClick={() => history.push('/churras-edit/' + churras._id)}>
                            <CardContent>
                                <div className={classes.cardRow}>
                                    <Typography variant="h6">
                                        {formatDate(churras.data)}
                                    </Typography>
                                    <Typography className={classes.cardColumn}>
                                        <MonetizationOnIcon />
                                        {getValorTotal(churras)}
                                    </Typography>
                                </div>
                                <Typography variant="body1">
                                    {churras.descricao}
                                </Typography>
                                <Typography className={classes.obsChurras} >
                                    {churras.observacoes}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <div className={classes.cardRow}>
                                    <Button size="small" onClick={(event) => props.removeEvento(churras, event)}>
                                        <DeleteIcon color='action' />
                                    </Button>
                                    <Button className={classes.cardColumn}>
                                        <PeopleIcon />
                                        {churras.participantes.length}
                                    </Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
            <div className={classes.btnAdd}>
                <Link href="#/churras-add">
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </div>
        </Grid>
    )
}
