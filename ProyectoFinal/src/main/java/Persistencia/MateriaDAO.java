package Persistencia;

import com.example.logic.Materia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class MateriaDAO {
    private Connection connection;

    public MateriaDAO(Connection connection) {
        this.connection = connection;
    }

    public void insertMateria(Materia materia) {
        String sql = "INSERT INTO materia (nombre, id_semestre) VALUES (?, ?)";

        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, materia.getNombre());
            preparedStatement.setInt(2, materia.getSemestre().getId());

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
