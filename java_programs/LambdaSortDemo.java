import java.util.*;

public class LambdaSortDemo {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(Arrays.asList(
                "banana", "apple", "Cherry", "mango", "Apricot");
        Collections.sort(words, (a, b) -> a.compareToIgnoreCase(b));

        System.out.println("Sorted words:");
        words.forEach(System.out::println);
    }
}
