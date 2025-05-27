import java.lang.reflect.*;

public class ReflectionExample {
    public static void main(String[] args) throws Exception {
        Class<?> clazz = Class.forName("java.util.ArrayList");
        Method[] methods = clazz.getDeclaredMethods();

        for (Method method : methods) {
            System.out.println(method.getName());
        }

        Object obj = clazz.getDeclaredConstructor().newInstance();
        Method addMethod = clazz.getMethod("add", Object.class);
        addMethod.invoke(obj, "Hello via Reflection");

        System.out.println(obj);
    }
}
