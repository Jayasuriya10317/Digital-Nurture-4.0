import java.sql.*;

public class BasicJDBC {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:students.db"; // or "jdbc:mysql://localhost:3306/dbname"
        try (Connection conn = DriverManager.getConnection(url)) {
            String sql = "SELECT * FROM students";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                System.out.println(rs.getInt("id") + ": " + rs.getString("name"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
