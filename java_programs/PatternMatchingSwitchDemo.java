import java.util.*;
import java.util.stream.Collectors;

public class RecordExample {
    public static void main(String[] args) {
        record Person(String name, int age) {}

        List<Person> people = List.of(
                new Person("Alice", 22),
                new Person("Bob", 17),
                new Person("Charlie", 25),
                new Person("Diana", 16)
        );

        System.out.println("All people:");
        people.forEach(System.out::println);

        List<Person> adults = people.stream()
                                    .filter(p -> p.age() >= 18)
                                    .collect(Collectors.toList());

        System.out.println("\nPeople aged 18 or older:");
        adults.forEach(System.out::println);
    }
}
