package br.edu.ifrs.restinga.dev1.apcavalheiro.nivelamento_server.model;

import java.util.ArrayList;
import java.util.List;

public class Convidados {

    private List<Convidado> convidados;

    public Convidados() {
        this.convidados = new ArrayList<>();
    }

    public List<Convidado> getConvidados() {
        return convidados;
    }

    public void setConvidados(List<Convidado> convidados) {
        this.convidados = convidados;
    }
}
