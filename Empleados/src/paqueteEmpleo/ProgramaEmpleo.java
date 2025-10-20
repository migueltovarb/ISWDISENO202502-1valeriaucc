package paqueteEmpleo;

public class ProgramaEmpleo {
    public static void main(String[] args) {
        // Polimorfismo de subtipo (todas son Empleado)
        Empleado e1 = new Empleado("Laura", 1500000);
        Empleado s1 = new Secretario("Andrés", 1800000, "Oficina 3B", "555-9988");
        Empleado v1 = new Vendedor("Sofía", 2000000, "Mazda CX-5", 12.5);

        Empleado[] empleados = { e1, s1, v1 };

        System.out.println("=== Información inicial ===");
        for (Empleado emp : empleados) {
            emp.imprimirDatos();
        }

        System.out.println("\n=== Incremento de salarios ===");
        for (Empleado emp : empleados) {
            emp.incrementarSalario(); // se ejecuta según el tipo real del objeto
        }

        System.out.println("\n=== Datos actualizados ===");
        for (Empleado emp : empleados) {
            emp.imprimirDatos();
        }
    }
}
