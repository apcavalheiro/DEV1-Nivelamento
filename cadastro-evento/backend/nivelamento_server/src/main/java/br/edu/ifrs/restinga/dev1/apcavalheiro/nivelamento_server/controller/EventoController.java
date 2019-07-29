package br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.controller;

import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model.Convidado;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model.Convidados;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model.Evento;
import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@SuppressWarnings("ALL")
@RestController
@RequestMapping(value = "/api")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping("/eventos")
    public ResponseEntity<Iterable<Evento>> listarEventos() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(this.eventoService.pesquisarEventos());
    }

    @PostMapping("/eventos/")
    public ResponseEntity<Evento> cadastrarEvento(@RequestBody Evento evento) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.eventoService.cadastrarEvento(evento));
    }

    @PostMapping("/eventos/{idEvento}/convidados/")
    public ResponseEntity<List<Convidado>> cadastrarConvidados(@RequestBody Convidados convidados,
                                                               @PathVariable Integer idEvento) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(this.eventoService.cadastrarConvidados(convidados, idEvento));
    }

    @DeleteMapping("/eventos/{idEvento}")
    public ResponseEntity<Void> excluirEvento(@PathVariable Integer idEvento) {
        this.eventoService.excluirEvento(idEvento);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}


