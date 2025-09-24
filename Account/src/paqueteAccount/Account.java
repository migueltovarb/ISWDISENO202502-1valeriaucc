package paqueteAccount;

public class Account {

    // Atributos privados
    private String id;
    private String name;
    private int balance = 0; // por defecto 0

    // Constructor con id y nombre (balance = 0)
    public Account(String id, String name) {
        this.id = id;
        this.name = name;
    }

    // Constructor con id, nombre y balance inicial
    public Account(String id, String name, int balance) {
        this.id = id;
        this.name = name;
        this.balance = balance;
    }

    // Métodos getter
    public String getID() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getBalance() {
        return balance;
    }

    // Añade dinero a la cuenta
    public int credit(int amount) {
        balance += amount;
        return balance;
    }

    // Retira dinero de la cuenta (si hay saldo suficiente)
    public int debit(int amount) {
        if (amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Amount exceeded balance");
        }
        return balance;
    }

    // Transfiere dinero a otra cuenta
    public int transferTo(Account another, int amount) {
        if (amount <= balance) {
            this.balance -= amount;
            another.balance += amount;
        } else {
            System.out.println("Amount exceeded balance");
        }
        return balance;
    }

    // Representación en texto
    @Override
    public String toString() {
        return "Account [id=" + id + ", name=" + name + ", balance=" + balance + "]";
    }
}

