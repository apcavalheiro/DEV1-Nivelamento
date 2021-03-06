import React, { Component, Fragment } from 'react';
import './main.css'
import axios from 'axios'
import EventosLista from '../eventos/EventosLista';
import FormEvento from '../eventos/FormEvento';

const initialState = {
  eventos: [],
  convidadosList: [],
  loading: true,
  evento: '',
  local: '',
  convidado: '',
  lista: [],
}

const urlBase = "/api/eventos/"
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
  }

  listEvents = () => {
    axios.get(urlBase).then(response => (
      this.setState({
        eventos: response.data,
        loading: false
      })
    ))
  }

  handleSubmit = e => {
    e.preventDefault()
    let { convidadosList } = this.state
    let lista = [...new Set(convidadosList)]
    const convidados = lista && lista.map((nome) => ({
      nome: nome
    }))
    const evento = {
      nome: this.state.evento,
      local: this.state.local,
      convidados: convidados
    }
    this.saveEvent(evento)
  }

  saveEvent = (evento) => {
    axios.post(urlBase, evento).then(
      () => this.handleClear()
    ).then(
      () => this.listEvents()
    ).catch(error => (
      this.setState({ erro: error.response.data })
    ))
  }

  componentDidMount() {
    this.listEvents()
  }

  handleDelete = (id) => {
    axios.delete(urlBase + id).then(
      () => this.listEvents()
    ).catch(error => (
      this.setState({ erro: error.response.data })
    ))
  }

  handlePush = () => {
    let { convidado, convidadosList } = this.state
    if (convidado === '') return
    convidadosList.push(convidado)
    this.setState({
      convidado: '',
      erro:''
    })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value,
    erro:'' })
  }

  handleClear = () => {
    this.setState({
      evento: '',
      local: '',
      convidado: '',
      convidadosList: [],
      erro:''

    })
  }

  deleteItemGuests = item => {
    const newState = this.state.convidadosList
    if (newState.indexOf(item) > -1) {
      newState.splice(newState.indexOf(item), 1)
      this.setState({
        convidadosList: newState
      })
    }
  }

  render() {
    const { eventos, loading, evento, convidado, local, convidadosList, erro } = this.state
    return (<Fragment>
      <FormEvento
        handleClear={this.handleClear}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handlePush={this.handlePush}
        evento={evento}
        convidado={convidado}
        convidados={convidadosList}
        local={local}
        erro={erro}
        deleteItemGuests={this.deleteItemGuests}
      />
      <EventosLista
        eventos={eventos}
        loading={loading}
        handleDelete={this.handleDelete}
      />
    </Fragment>)
  }
}