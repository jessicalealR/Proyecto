package com.example.logic;
import java.io.Serializable;

public class Actividad implements Serializable {
        private static final long serialVersionUID = 1L;
        private int id;
        private String nombre;
        private String tipo;
        private int ponderado;
        private String fecha;
        private int nota;
        private Materia materia;
        public Actividad() {
        }
        public Actividad(String nombre, String tipo, int ponderado, String fecha, int nota, Materia materia) {
            this.nombre = nombre;
            this.tipo = tipo;
            this.ponderado = ponderado;
            this.fecha = fecha;
            this.nota = nota;
            this.materia = materia;
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
        public String getTipo() {
            return tipo;
        }
        public void setTipo(String tipo) {
            this.tipo = tipo;
        }
        public int getPonderado() {
            return ponderado;
        }
        public void setPonderado(int ponderado) {
            this.ponderado = ponderado;
        }
        public String getFecha() {
            return fecha;
        }
        public void setFecha(String fecha) {
            this.fecha = fecha;
        }
        public int getNota() {
            return nota;
        }
        public void setNota(int nota) {
            this.nota = nota;
        }
        public Materia getMateria() {
            return materia;
        }
        public void setMateria(Materia materia) {
            this.materia = materia;
        }
}
