package br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.service;

import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model.Convidado;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model.Evento;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.repository.ConvidadoRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.repository.EventoRepository;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.service.exception.InvalidRequest;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.service.exception.ObjectNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private ConvidadoRepository convidadoRepository;

    public Evento pesquisarEvento(Integer id) {
        Optional<Evento> evento = this.eventoRepository.findById(id);
        return evento.orElseThrow(() ->
                new ObjectNotFound("Evento não encontrado! Id: " + id));
    }

    public List<Evento> pesquisarEventos() {
        List<Evento> eventos = this.eventoRepository.findAll();
        if (eventos.isEmpty()) {
            throw new ObjectNotFound("Nenhum evento cadastrado!");
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
            this.convidadoRepository.saveAll(this.isConvidados(evento.getConvidados()));
            eventoSalvo = this.eventoRepository.save(evento);
        } catch (NullPointerException e) {
            throw new ObjectNotFound("Não é permitido cadastro nulo!");
        }
        return eventoSalvo;
    }

    private void isEvento(Evento evento) {
        if (evento.equals("") || evento == null) {
            throw new ObjectNotFound("Não é permitido cadastro nulo!");
        }
        if (evento.getLocal() == null || evento.getLocal().equals("") ||
                evento.getNome().equals("") || evento.getNome() == null) {
            throw new ObjectNotFound("Todos os campos são obrigatórios!");
        }
    }

    private List<Convidado> isConvidados(List<Convidado> convidados) {
        Set list = new HashSet<>();
        try {
            convidados.removeIf(c->!list.add(c.getNome()));
            if (convidados.isEmpty() || convidados == null) {
                throw new ObjectNotFound("Não é permitido lista de convidados vazia!");
            }
            for (Convidado convidado : convidados) {
                if (convidado.getNome() == "" || convidado.getNome() == null) {
                    throw new InvalidRequest("Não é permitido cadastrar convidado sem nome!");
                }
            }
        } catch (NullPointerException e) {
            throw new ObjectNotFound("Não é permitido lista de convidados vazia!");
        }

        return convidados;
    }
}
