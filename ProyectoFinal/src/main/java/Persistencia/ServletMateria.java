package Persistencia;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet(name = "ServletMateria", value = "/ServletMateria")
public class ServletMateria extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");

        Connection connection = null;
        try {
            String jdbcUrl = "jdbc:mysql://localhost:3306/proyectomaterias";
            String username = "tu_usuario";
            String password = "tu_contraseña";

            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(jdbcUrl, username, password);


            insertarMateria(connection, "Nombre de la Materia", 1);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Materia agregada correctamente</h1>");
        out.println("</body></html>");
    }

    private void insertarMateria(Connection connection, String nombreMateria, int idSemestre) throws SQLException {
        String sql = "INSERT INTO materia (nombre, semestre_id) VALUES (?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, nombreMateria);
            preparedStatement.setInt(2, idSemestre);
            preparedStatement.executeUpdate();
        }
    }
}
