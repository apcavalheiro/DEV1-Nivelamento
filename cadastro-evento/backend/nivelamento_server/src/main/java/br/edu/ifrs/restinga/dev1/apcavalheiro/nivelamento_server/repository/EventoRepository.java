package br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.repository;

import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
}
