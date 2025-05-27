import java.util.Scanner;

public class EvenOrOddChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Please enter a whole number: ");
        int number = scanner.nextInt();

        if (number % 2 == 0) {
            System.out.println("Nice! The number " + number + " is even.");
        } else {
            System.out.println("The number " + number + " is odd.");
        }

        scanner.close();
    }
}
