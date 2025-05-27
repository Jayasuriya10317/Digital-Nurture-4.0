public class TypeCastingExample {
    public static void main(String[] args) {
        double decimalValue = 9.75;
        int castedToInt = (int) decimalValue;
        System.out.println("Double to int: " + castedToInt);

        int wholeNumber = 7;
        double castedToDouble = (double) wholeNumber;
        System.out.println("Int to double: " + castedToDouble);
    }
}
