import React, { useState, useEffect } from "react";
import { TextField, makeStyles, Button, Table, TableBody, TableCell, TableContainer, TableHead } from "@material-ui/core";
import {TableRow, Paper, Checkbox, Card, CardContent, Grid, Link } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";

const useStyles = makeStyles((theme) => ({
    fieldDate: {
        display: "flex",
        flexDirection: "column",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
        width: 700,
    },
    btnAddInput: {
        marginLeft: theme.spacing(83),
        marginTop: theme.spacing(2),
    },
    inputParticipantes: {
        width: "100%",
    },
    textField: {
        display: "flex",
        flexDirection: "column",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    textFieldValor: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
        width: "342px",
    },
    form: {
        marginTop: theme.spacing(4),
    },
    gridContainer: {
        paddingLeft: "50px",
        paddingRight: "50px",
        paddingTop: "20px",
        marginTop: "30px",
    },
    h3Participantes: {
        marginTop: "35px",
    },
    btnAdd: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(32),
    },
    btnCancel: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(1),
    },
}));

export default function ChurrasForm({ state, setState, ...props }) {
    const { handleSubmit, control } = useForm();

    const [nomeParticipante, setNomeParticipante] = useState("");

    const classes = useStyles();

    const onChangeCheckboxParticipante = (event, participante, key) => {
        participante[key] = event.target.checked;
        setState({ ...state, participantes: [...state.participantes] });
    };

    const addParticipante = () => {
        if (!nomeParticipante || nomeParticipante === ' ') return;
        const participante = {
            nome: nomeParticipante,
            comBebida: false,
            pago: false,
        };
        const participantes = [...state.participantes, participante];
        setState({ ...state, participantes });
        setNomeParticipante("");
    };

    const removeParticipante = (index) => {
        state.participantes.splice(index, 1);
        setState({ ...state, participantes: [...state.participantes] });
    };

    const onChangeNomeParticipante = (event) => {
        setNomeParticipante(event.target.value);
    };

    const onChangeFactory = (key) => {
        return (value) => setState({ ...state, [key]: value });
    };

    const onSubmit = () => props.onSubmit(state);

    return (
        <Grid
            container
            spacing={4}
            className={classes.gridContainer}
            justify="center"
        >
            <Grid item xs={12}>
                <form
                    noValidate
                    className={classes.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Card>
                        <CardContent>
                            <h2>Churrasco</h2>
                            <FormInput
                                required
                                name="descricao"
                                defaultValue={state.descricao}
                                errorsMessage={{ required: "Digite a descrição" }}
                                control={control}
                                onChange={onChangeFactory("descricao")}
                                className={classes.textField}
                                label="Adicione descrição"
                            />

                            <FormInput
                                label="Adicione uma observação"
                                defaultValue={state.observacoes}
                                name="observacoes"
                                className={classes.textField}
                                control={control}
                                onChange={onChangeFactory("observacoes")}
                            />

                            <FormInput
                                name="data"
                                defaultValue={state.data}
                                label="Data"
                                type="date"
                                className={classes.fieldDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                control={control}
                                onChange={onChangeFactory("data")}
                                required
                                errorsMessage={{ required: "Digite a data" }}
                            />

                            <FormInput
                                defaultValue={state.valorComBebida}
                                label="Valor com bebida"
                                className={classes.textFieldValor}
                                name="valorComBebida"
                                required
                                currency
                                errorsMessage={{ required: "Digite o valor" }}
                                control={control}
                                onChange={onChangeFactory("valorComBebida")}
                            />

                            <FormInput
                                defaultValue={state.valorSemBebida}
                                label="Valor sem bebida"
                                className={classes.textFieldValor}
                                name="valorSemBebida"
                                required
                                currency
                                errorsMessage={{ required: "Digite o valor" }}
                                control={control}
                                onChange={onChangeFactory("valorSemBebida")}
                            />

                            <h3 className={classes.h3Participantes}>Participantes</h3>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Nome</TableCell>
                                            <TableCell align="right">Valor</TableCell>
                                            <TableCell align="center">C/ Bebida</TableCell>
                                            <TableCell align="center">Pago</TableCell>
                                            <TableCell align="center">Ações</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {state.participantes.map((participante, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {participante.nome}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {participante.comBebida
                                                        ? state.valorComBebida
                                                        : state.valorSemBebida}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Checkbox
                                                        checked={participante.comBebida}
                                                        onChange={(event) =>
                                                            onChangeCheckboxParticipante(
                                                                event,
                                                                participante,
                                                                "comBebida"
                                                            )
                                                        }
                                                        color="primary"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Checkbox
                                                        checked={participante.pago}
                                                        onChange={(event) =>
                                                            onChangeCheckboxParticipante(
                                                                event,
                                                                participante,
                                                                "pago"
                                                            )
                                                        }
                                                        color="primary"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button onClick={() => removeParticipante(index)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <TextField
                                                    label="Nome"
                                                    variant="outlined"
                                                    value={nomeParticipante}
                                                    onChange={onChangeNomeParticipante}
                                                    className={classes.inputParticipantes}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button color="primary" onClick={addParticipante}>
                                                    <AddCircleIcon fontSize="large" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.btnAdd}
                        type="submit"
                    >
                        Salvar
          </Button>

                    <Link href="#/churras">
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.btnCancel}
                        >
                            Cancelar
            </Button>
                    </Link>
                </form>
            </Grid>
        </Grid>
    );
}
