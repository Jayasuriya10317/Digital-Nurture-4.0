public class OperatorPrecedenceExample {
    public static void main(String[] args) {
        int result1 = 10 + 5 * 2;
        System.out.println("10 + 5 * 2 = " + result1 + "  (Multiplication happens before addition)");

        int result2 = (10 + 5) * 2;
        System.out.println("(10 + 5) * 2 = " + result2 + "  (Parentheses evaluated first)");

        int result3 = 20 / 5 + 3 * 4 - 6;
        System.out.println("20 / 5 + 3 * 4 - 6 = " + result3 + "  (Division and multiplication first, then addition and subtraction)");

        int result4 = 10 + 12 / 4 * 3 - 1;
        System.out.println("10 + 12 / 4 * 3 - 1 = " + result4 + "  (Division and multiplication before addition and subtraction)");

        int result5 = 5 + 2 * (8 - 3) / 5;
        System.out.println("5 + 2 * (8 - 3) / 5 = " + result5 + "  (Parentheses first, then multiplication and division)");

        int result6 = 18 / (3 * 2) + 4 * 2;
        System.out.println("18 / (3 * 2) + 4 * 2 = " + result6 + "  (Parentheses first, then division and multiplication)");
    }
}
