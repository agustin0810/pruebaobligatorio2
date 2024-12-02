package com.practrel.practrel.Entity;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Libro {
    
    @Id
    private int codigoBarras;

    @Column
    private String titulo;

    @ManyToOne
    @JoinColumn(name="idBiblioteca", referencedColumnName = "id")
    private Biblioteca biblioteca;

    public int getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(int codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Biblioteca getBiblioteca() {
        return biblioteca;
    }

    public void setBiblioteca(Biblioteca biblioteca) {
        this.biblioteca = biblioteca;
    }

    public Libro(int codigoBarras, String titulo, Biblioteca biblioteca) {
        this.codigoBarras = codigoBarras;
        this.titulo = titulo;
        this.biblioteca = biblioteca;
    }

    public Libro(){

    }


}
