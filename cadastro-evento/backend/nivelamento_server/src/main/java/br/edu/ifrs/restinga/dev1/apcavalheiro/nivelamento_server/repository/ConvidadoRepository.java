package br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.repository;

import br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model.Convidado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConvidadoRepository extends JpaRepository<Convidado, Integer> {
}
