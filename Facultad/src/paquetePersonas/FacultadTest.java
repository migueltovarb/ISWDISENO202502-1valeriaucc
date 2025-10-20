package paquetePersonas;

public class FacultadTest {
    public static void main(String[] args) {
        // Polimorfismo de inclusión: un objeto Estudiante es también una Persona
        Persona p1 = new Estudiante("Laura", "Gómez", "1001", "Soltera", "Matemáticas");
        Persona p2 = new Profesor("Carlos", "Martínez", "2002", "Casado", 2015, "A12", "Informática");
        Persona p3 = new PersonalServicio("Ana", "Rojas", "3003", "Divorciada", 2018, "B07", "Biblioteca");

        // Muestra información polimórfica
        System.out.println("=== Datos de Personas en la Facultad ===");
        p1.imprimir();
        System.out.println("--------------------------------------");
        p2.imprimir();
        System.out.println("--------------------------------------");
        p3.imprimir();

        // Ejemplo de cambio de estado
        System.out.println("\n=== Actualizando datos ===");
        ((Estudiante)p1).matricularNuevoCurso("Física");
        ((Profesor)p2).cambiarDepartamento("Matemáticas");
        ((PersonalServicio)p3).trasladarSeccion("Laboratorio");
        p1.imprimir();
        System.out.println("--------------------------------------");
        p2.imprimir();
        System.out.println("--------------------------------------");
        p3.imprimir();
    }
}
