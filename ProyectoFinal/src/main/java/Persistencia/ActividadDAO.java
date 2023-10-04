package Persistencia;

import com.example.logic.Actividad;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ActividadDAO {
    private Connection connection;

    public ActividadDAO(Connection connection) {
        this.connection = connection;
    }

    public void insertActividad(Actividad actividad) {
        String sql = "INSERT INTO actividad (nombre, tipo, ponderado, fecha, nota, id_materia) VALUES (?, ?, ?, ?, ?, ?)";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, actividad.getNombre());
            preparedStatement.setString(2, actividad.getTipo());
            preparedStatement.setInt(3, actividad.getPonderado());
            preparedStatement.setString(4, actividad.getFecha());
            preparedStatement.setInt(5, actividad.getNota());
            preparedStatement.setInt(6, actividad.getMateria().getId()); // Asumiendo que tienes un campo "id" en la tabla materia

            // Ejecutar la inserción
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace(); // Manejo adecuado de la excepción en tu aplicación
        }
    }
}
