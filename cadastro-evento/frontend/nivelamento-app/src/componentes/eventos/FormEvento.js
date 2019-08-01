import React, { Component } from 'react'
import './form.css'

export default class FormEvento extends Component {

  deleteEvent(item) {
    const newState = this.props.convidados
    if (newState.indexOf(item) > -1) {
      newState.splice(newState.indexOf(item), 1)
      this.setState({
        convidados: newState
      })
    }
  }

  render() {
    let { evento, local, convidado, handleChange, handlePush, handleClear, convidados , handleSubmit} = this.props
    let lista = convidados && convidados.map(((nome, index) =>
      <tr key={index}>
        <td>{nome}{' '}
          <button type="button" onClick={this.deleteEvent.bind(this, nome)} style={{ width: "25px", height: "20px" }}>X</button>
        </td>
      </tr>
    ))
   
    return (<div className="eventosForm">
      <form onSubmit={handleSubmit} >
        <fieldset >

          <legend>Cadastro de Evento:</legend>
          <br />
          <br />
          Evento:<br />
          <input type="text" name="evento" value={evento || ''} onChange={handleChange} placeholder="evento..." required />
          <br />
          Local:<br />
          <input type="text" name="local" value={local || ''} onChange={handleChange} placeholder="local..." required />
          <br />
          <br />
          <hr />
          <br />
          <table >
            <thead>
              <tr >
                <th>Convidados</th>
              </tr>
            </thead>
            <tbody>
              {lista || <tr><td>{''}</td></tr>}
            </tbody>
          </table>
          <hr />
          <br />
          Nome:<br />
          <input type="text" name="convidado" value={convidado || ''} onChange={handleChange} placeholder="convidado..." />
          <input type="button" onClick={handlePush} value="Adicionar" style={{ background: "blue", borderColor: "blue", color: "#fff" }} />
          <br /><br />
          <input type="button" value="Cancelar" onClick={handleClear} />{' '}
          <input type="submit" value="Adicionar Evento" style={{ background: "green", borderColor: "green", color: "#fff" }} />
        </fieldset>
      </form>
    </div>)
  }
}

