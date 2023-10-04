package com.example.logic;

import java.io.Serializable;

public class Semestre implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private int numero;

    public Semestre() {
    }
    public Semestre(int numero) {
        this.numero = numero;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }
}
