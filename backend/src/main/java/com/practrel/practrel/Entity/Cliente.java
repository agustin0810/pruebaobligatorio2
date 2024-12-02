package com.practrel.practrel.Entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Cliente {
    
    @Id
    private int ci;

    @Column
    private String nombreCompleto;

    @ManyToMany(mappedBy = "clientes")
    @JsonIgnore
    private Set<Biblioteca> bibliotecas;

    public int getCi() {
        return ci;
    }

    public void setCi(int ci) {
        this.ci = ci;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public Set<Biblioteca> getBibliotecas() {
        return bibliotecas;
    }

    public void setBibliotecas(Set<Biblioteca> bibliotecas) {
        this.bibliotecas = bibliotecas;
    }

    public Cliente(int ci, String nombreCompleto, Set<Biblioteca> bibliotecas) {
        this.ci = ci;
        this.nombreCompleto = nombreCompleto;
        this.bibliotecas = bibliotecas;
    }

    public Cliente(){}
}
