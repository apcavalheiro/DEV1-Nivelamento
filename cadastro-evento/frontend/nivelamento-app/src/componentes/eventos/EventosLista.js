import React, { Component } from 'react'

export default class EventosLista extends Component {

  render() {
    const { eventos, loading } = this.props
    const listaEventos = eventos && eventos.map(e => (
      <tr key={e.id}>
        <td style={{ width: "5%" }}>{e.id}</td>
        <td style={{ width: "20%" }}>{e.nome}</td>
        <td style={{ width: "20%" }}>{e.local}</td>
        <td style={{ width: "40%" }}>{
          e.convidados && e.convidados.map(c => (
            <ul key={c.id}>
              <li style={{ margin: "20px" }}>{c.nome}</li>
            </ul>
          ))
        }</td>
        <td style={{ width: "15%" }}><button onClick={() => this.props.handleDelete(e.id)} >Excluir</button></td>
      </tr>
    ))

    return (
      <div className="eventosLista">
        <table style={{ width: "50%" }}>
          <thead>
            <tr>
              <th style={{ width: "5%" }} >ID</th>
              <th style={{ width: "20%" }}>Evento</th>
              <th style={{ width: "20%" }}>Local</th>
              <th style={{ width: "40%" }}>Convidados</th>
              <th style={{ width: "15%" }}></th>
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
