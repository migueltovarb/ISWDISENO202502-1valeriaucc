package paqueteEmploye;

public class TestEmploye {

    public static void main(String[] args) {
        Employe emp1 = new Employe(1, "Valeria", "Torres", 2500);

        System.out.println(emp1); 
        System.out.println("ID: " + emp1.getId());
        System.out.println("Nombre: " + emp1.getName());
        System.out.println("Salario mensual: " + emp1.getSalary());
        System.out.println("Salario anual: " + emp1.getAnnualSalary());

        emp1.raiseSalary(10);
        System.out.println("Salario después del aumento: " + emp1.getSalary());

        System.out.println(emp1);
    }
}
