import React, { Component } from 'react'

export default class EventosLista extends Component {

  render() {
    const { eventos, loading } = this.props
    const listaEventos = eventos && eventos.map(e => (
      <tr key={e.id}>
        <td style={{ width: "5%" }}>{e.id}</td>
        <td >{e.nome}</td>
        <td >{e.local}</td>
        <td >{
          e.convidados && e.convidados.map(c => (
            <ul key={c.id}>
              <li style={{ margin: "20px" }}>{c.nome}</li>
            </ul>
          ))
        }</td>
        <td ><button  onClick={() => this.props.handleDelete(e.id)} >Excluir</button></td>
      </tr>
    ))

    return (
      <div className="eventosLista">
        <table style={{ width: "50%" }}>
          <thead>
            <tr>
              <th style={{ width: "5%" }} >ID</th>
              <th >Evento</th>
              <th >Local</th>
              <th >Convidados</th>
              <th ></th>
            </tr>
          </thead>
          <tbody>
            {loading === true ? <tr><td>"Carregando dados..."</td></tr> : listaEventos}
          </tbody>
        </table>
      </div>
    )
  }
}
