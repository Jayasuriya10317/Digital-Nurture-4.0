import java.util.HashMap;
import java.util.Scanner;

public class StudentMap {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>();
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter student ID and name (type '0' as ID to stop):");

        while (true) {
            System.out.print("ID: ");
            int id = scanner.nextInt();
            scanner.nextLine(); // consume newline

            if (id == 0) {
                break;
            }

            System.out.print("Name: ");
            String name = scanner.nextLine();

            studentMap.put(id, name);
        }

        System.out.print("Enter an ID to lookup: ");
        int lookupId = scanner.nextInt();

        if (studentMap.containsKey(lookupId)) {
            System.out.println("Name: " + studentMap.get(lookupId));
        } else {
            System.out.println("No student found with ID " + lookupId);
        }

        scanner.close();
    }
}
