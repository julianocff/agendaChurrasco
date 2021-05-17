import React, { Component } from 'react'
import axios from 'axios'

import ChurrasListContainer from './churrasListContainer'

const URL = 'http://localhost:3003/api/churrastrinca'

export default class Churras extends Component {

    constructor(props) {
        super(props)
        this.state = { lista: [] }
        this.removeEvento = this.removeEvento.bind(this)
        this.atualiza()
    }

    atualiza() {
        axios.get(`${URL}`)
            .then(resp => this.setState({ ...this.state, lista: resp.data }))
            .catch(e => console.log('atualiza', e));
    }

    removeEvento(churras, event) {
        event.stopPropagation()
        axios.delete(`${URL}/${churras._id}`)
            .then(resp => this.atualiza())
    }

    render() {
        return (
            <ChurrasListContainer lista={this.state.lista} removeEvento={this.removeEvento} />
        )
    }
}