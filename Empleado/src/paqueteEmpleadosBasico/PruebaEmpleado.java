package paqueteEmpleadosBasico;

public class PruebaEmpleado {
    public static void main(String[] args) {
        // Creación de empleados usando sobrecarga de constructores
        Empleado e1 = new Empleado("Ana", "Martínez", "10101010", "Calle 10 #15", 3, "3012223344", 1800000);
        Empleado e2 = new Empleado("Carlos", "López", "20202020", "Carrera 5 #9", 2000000);

        // Asignar supervisor
        e2.cambiarSupervisor(e1);

        System.out.println("=== Información de los empleados ===");
        System.out.println(e1);
        System.out.println("----------------------------------");
        System.out.println(e2);
        System.out.println("----------------------------------");

        // Incrementar salario
        System.out.println("\n=== Incrementando salarios ===");
        e1.incrementarSalario(10);
        e2.incrementarSalario(15);

        System.out.println(e1.getNombre() + " nuevo salario: $" + e1.getSalario());
        System.out.println(e2.getNombre() + " nuevo salario: $" + e2.getSalario());
    }
}
