package paqueteEmpresa;

public class ProgramaEmpresa {
    public static void main(String[] args) {
        // Crear empleados
        Secretario sec1 = new Secretario("Camila", 1800000, "Oficina 3B", "555-1111");
        Vendedor v1 = new Vendedor("David", 2000000, "Toyota Corolla", 10);
        Vendedor v2 = new Vendedor("Paula", 2100000, "Mazda 3", 12);
        JefeDeZona jefe = new JefeDeZona("Andrés", 3000000, "Oficina 1A", "BMW X5", sec1);

        jefe.altaVendedor(v1);
        jefe.altaVendedor(v2);

        System.out.println("\n=== Datos iniciales ===");
        sec1.imprimirDatos();
        v1.imprimirDatos();
        v2.imprimirDatos();
        jefe.imprimirDatos();

        System.out.println("\n=== Incrementos salariales ===");
        Empleado[] empleados = { sec1, v1, v2, jefe };
        for (Empleado e : empleados) {
            e.incrementarSalario(); // Polimorfismo de subtipo
        }

        System.out.println("\n=== Datos finales ===");
        for (Empleado e : empleados) {
            e.imprimirDatos();
        }

        System.out.println("\n=== Cambios ===");
        jefe.cambiarCoche("Audi A4");
        jefe.cambiarSecretario(new Secretario("Valeria", 1850000, "Oficina 2C", "555-2222"));
        jefe.bajaVendedor(v1);
        jefe.imprimirDatos();
    }
}
