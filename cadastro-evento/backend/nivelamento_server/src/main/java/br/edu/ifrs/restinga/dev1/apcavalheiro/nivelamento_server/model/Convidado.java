package br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Convidado implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String nome;

    public Convidado() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Convidado convidado = (Convidado) o;
        return id.equals(convidado.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
