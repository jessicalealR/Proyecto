package Persistencia;
import com.example.logic.Semestre;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class SemestreDAO {

    private static final String INSERT_SEMESTRE_SQL = "INSERT INTO semestre (nombre) VALUES (?)";

    public void insertSemestre(Semestre semestre) {
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(INSERT_SEMESTRE_SQL)) {

            preparedStatement.setString(1, String.valueOf(semestre.getNumero()));

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
