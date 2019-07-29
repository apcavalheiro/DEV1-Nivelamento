import React, { Component } from 'react';
import axios from 'axios'
import EventosLista from '../eventos/EventosLista';

const initialState = {
  eventos: [],
  loading: true
}
const urlBase = "/api/eventos/"
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
  }

  handleDelete = (id) => {
    axios.delete(urlBase + id).then(
      () => this.listEvents()
    ).catch(error =>
      console.log(error)
    )
  }

  componentDidMount() {
    this.listEvents()
  }

  listEvents = () => (
    axios.get(urlBase).then(response => (
      this.setState({
        eventos: response.data,
        loading: false
      })
    ))
  )


  render() {
    const { eventos, loading } = this.state
    return <EventosLista eventos={eventos} loading={loading} handleDelete={this.handleDelete} />
  }
}