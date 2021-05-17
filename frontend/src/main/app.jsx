import React from 'react'
import Menu from '../template/menu'
import Rotas from './routes'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

export default props => (
    <React.Fragment>
        <CssBaseline />
        <Menu />
        <Container>
            <Rotas />
        </Container>
    </React.Fragment>
)