import React, { Component, Fragment } from 'react';
import './main.css'
import axios from 'axios'
import EventosLista from '../eventos/EventosLista';
import EventosForm from '../eventos/EventosForm';

const initialState = {
  idEvento: '',
  eventos: [],
  convidadosList: [],
  loading: true,
  evento: '',
  local: '',
  convidado: '',
  errorMessage: ''
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
    const convidados = convidadosList && convidadosList.map((nome) => ({
      nome: nome
    }))
    const evento = {
      nome: this.state.evento,
      local: this.state.local,
      convidados: convidados
    }
    this.saveEvent(evento)
  }

  async  saveEvent(evento) {
     await axios.post(urlBase, evento).then(
      () => this.listEvents()
     ).catch(error =>
       this.setState({ errorMessage: error.response.data.message })
     )
   }

  componentDidMount() {
    this.listEvents()
  }

  handleDelete = (id) => {
    axios.delete(urlBase + id).then(
      () => this.listEvents()
    ).catch(error =>
      this.setState({ errorMessage: error.response.data.message })
    )
  }

  handlePush = () => {
    const { convidado, convidadosList } = this.state
    if (convidado === '') return
    convidadosList.push(convidado)
    this.setState({
      convidado: ''
    })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleClear = () => {
    this.setState({
      evento: '',
      local: '',
      convidado: ''
    })
  }

  render() {
    const { eventos, loading, evento, convidado, local, convidadosList } = this.state
    return (<Fragment>
      <EventosForm
        handleClear={this.handleClear}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handlePush={this.handlePush}
        evento={evento}
        convidado={convidado}
        convidados={convidadosList}
        local={local}
      />
      <EventosLista
        eventos={eventos}
        loading={loading}
        handleDelete={this.handleDelete}
      />
    </Fragment>)
  }
}