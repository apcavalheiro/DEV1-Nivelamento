import React, { Component } from 'react'

export default class EventosLista extends Component {

  render() {
    const { eventos, loading } = this.props

    const listaEventos = eventos && eventos.map(e => (
      <tr key={e.id}>
        <td>{e.id}</td>
        <td>{e.nome}</td>
        <td>{e.local}</td>
        <td>{
          e.convidados && e.convidados.map(c => (
            <ul key={c.id}>
              <li>{c.nome}</li>
            </ul>
          ))
        }</td>
        <td><button type="button" onClick={() => this.props.handleDelete(e.id)} >Excluir</button></td>
      </tr>
    ))

    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Evento</th>
            <th>Local</th>
            <th>Convidados</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading === true ? <tr><td>"Carregando dados..."</td></tr> : listaEventos}
        </tbody>
      </table>
    )
  }
}