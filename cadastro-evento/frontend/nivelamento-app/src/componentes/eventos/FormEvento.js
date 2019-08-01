import React, { Component } from 'react'
import './form.css'

export default class FormEvento extends Component {

  render() {
    let { evento, local, convidado, handleChange, deleteItemGuests,
      handlePush, handleClear, convidados, handleSubmit, erro } = this.props
    let lista = convidados && convidados.map(((nome, index) =>
      <tr key={index}>
        <td>{nome}{' '}
          <button type="button" onClick={() => deleteItemGuests(nome)}
            style={{ width: "25px", height: "20px" }}>X</button>
        </td>
      </tr>
    ))

    return (<div className="eventosForm">
      <form onSubmit={handleSubmit} >
        <fieldset >
          <legend>Cadastro de Evento:</legend>
          <br />
          {!erro ? '' : <div className="erro">
            <strong>{erro.message}</strong>
          </div>}
          <br />
          Evento:<br />
          <input type="text" name="evento" value={evento || ''}
            onChange={handleChange} placeholder="Evento..." required />
          <br />
          Local:<br />
          <input type="text" name="local" value={local || ''}
            onChange={handleChange} placeholder="Local..." required />
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
          <input type="text" name="convidado" value={convidado || ''}
            onChange={handleChange} placeholder="Convidado..." />
          <input type="button" onClick={handlePush} value="Adicionar"
            style={{ background: "blue", borderColor: "blue", color: "#fff" }} />
          <br /><br />
          <input type="button" value="Cancelar" onClick={handleClear} />{' '}
          <input type="submit" value="Adicionar Evento"
            style={{ background: "green", borderColor: "green", color: "#fff" }} />
        </fieldset>
      </form>
    </div>)
  }
}

