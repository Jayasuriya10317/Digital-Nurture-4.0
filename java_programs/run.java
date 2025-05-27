class MessagePrinter implements Runnable {
    private String message;

    public MessagePrinter(String message) {
        this.message = message;
    }

    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(message + " - " + (i + 1));
            try {
                Thread.sleep(500); // Pause for half a second
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}

public class ThreadDemo {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new MessagePrinter("Thread 1"));
        Thread thread2 = new Thread(new MessagePrinter("Thread 2"));

        thread1.start();
        thread2.start();
    }
}
