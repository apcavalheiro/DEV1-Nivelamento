package br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.service;

import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model.Convidado;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model.Convidados;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model.Evento;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.repository.ConvidadoRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.repository.EventoRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.service.exception.InvalidRequest;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.service.exception.ObjectNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private ConvidadoRepository convidadoRepository;

    public Evento pesquisarEvento(Integer id) {
        Optional<Evento> evento = this.eventoRepository.findById(id);
        return evento.orElseThrow(() ->
                new ObjectNotFound("Evento não encontrado! Id: " + id
                        + ", Tipo: " + Evento.class.getName()));
    }

    public List<Evento> pesquisarEventos() {
        List<Evento> eventos = this.eventoRepository.findAll();
        if (eventos.isEmpty()) {
            throw new ObjectNotFound("Nenhum evento cadastrado! Tipo: "
                    + Evento.class.getName());
        }
        return eventos;
    }

    public void excluirEvento(Integer idEvento) {
        Evento evento = this.pesquisarEvento(idEvento);
        this.eventoRepository.delete(evento);
    }

    public Evento cadastrarEvento(Evento evento) {
        Evento eventoSalvo = null;
        try {
            isEvento(evento);
            eventoSalvo = this.eventoRepository.save(evento);
        } catch (NullPointerException e) {
            throw new ObjectNotFound("Não é permitido cadastro nulo!" +
                    " Tipo: " + Evento.class.getName());
        }
        return evento;
    }

    private void isEvento(Evento evento) {
        if (evento.equals("") || evento == null) {
            throw new ObjectNotFound("Não é permitido cadastro nulo!" +
                    " Tipo: " + Evento.class.getName());
        }
        if (evento.getLocal() == null || evento.getLocal().equals("") || evento.getNome().equals("") || evento.getNome() == null) {
            throw new ObjectNotFound("Todos os campos são obrigatórios!" +
                    " Tipo: " + Evento.class.getName());
        }
    }

    public List<Convidado> cadastrarConvidados(Convidados convidados, Integer idEvento) {
        Evento evento = this.pesquisarEvento(idEvento);
        try {
            if (convidados.getConvidados().isEmpty()) {
                throw new ObjectNotFound("Não é permitido lista de convidados vazia!" +
                        " Tipo: " + Evento.class.getName());
            }
            for (Convidado convidado : convidados.getConvidados()) {
                if (convidado.getNome() == "" || convidado.getNome() == null) {
                    throw new InvalidRequest("Não é permitido cadastrar convidado sem nome! Tipo: "
                            + Convidado.class.getName());
                }
                for (Convidado convidadoDb : evento.getConvidados()) {
                    if (convidadoDb.getNome().equals(convidado.getNome())) {
                        throw new InvalidRequest("O Convidado: "
                                + convidado.getNome()
                                + " já está inscrito neste evento!"
                                + "Tipo: " + Convidado.class.getName());
                    }
                }
                evento.getConvidados().add(this.convidadoRepository.save(convidado));
            }
            this.eventoRepository.save(evento);
        } catch (NullPointerException e) {
            throw new ObjectNotFound("Não é permitido lista de convidados vazia!" +
                    " Tipo: " + Evento.class.getName());
        }
        return evento.getConvidados();
    }
}
