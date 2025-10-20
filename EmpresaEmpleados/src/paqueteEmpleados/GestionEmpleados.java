package paqueteEmpleados;

public class GestionEmpleados {
    public static void main(String[] args) {
        Empleado[] empleados = new Empleado[3];

        empleados[0] = new EmpleadoBase("Ana", "Martínez", "10101010", "Calle 10 #15", 1, "3012223344", 1800000);
        empleados[1] = new EmpleadoBase("Carlos", "López", "20202020", "Carrera 5 #9", 4, "3021114455", 2000000);
        empleados[2] = new EmpleadoSupervisor("Laura", "Gómez", "30303030", "Av 7 #12", 6, "3009998888", 3500000, 5);

        empleados[0].cambiarSupervisor(empleados[2]);
        empleados[1].cambiarSupervisor(empleados[2]);

        System.out.println("=== Información de empleados antes del aumento ===");
        for (Empleado e : empleados) {
            System.out.println(e.toString());
            System.out.println("-----------------------------------------");
        }

        System.out.println("\n=== Aplicando incrementos de salario ===");
        for (Empleado e : empleados) {
            e.incrementarSalario(10);
        }

        System.out.println("\n=== Información de empleados después del aumento ===");
        for (Empleado e : empleados) {
            System.out.println(e.toString());
            System.out.println("-----------------------------------------");
        }
    }
}
