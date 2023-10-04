package com.example.logic;
import java.io.Serializable;

public class Materia implements Serializable {
        private static final long serialVersionUID = 1L;

        private int id;
        private String nombre;
        private Semestre semestre;

        public Materia() {
        }

        public Materia(String nombre, Semestre semestre) {
            this.nombre = nombre;
            this.semestre = semestre;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getNombre() {
            return nombre;
        }

        public void setNombre(String nombre) {
            this.nombre = nombre;
        }

        public Semestre getSemestre() {
            return semestre;
        }

        public void setSemestre(Semestre semestre) {
            this.semestre = semestre;
        }
}

