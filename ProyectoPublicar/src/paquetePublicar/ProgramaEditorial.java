package paquetePublicar;

import java.util.Scanner;

public class ProgramaEditorial {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("=== Editorial de Libros y Discos ===");

        System.out.println("\n--- Ingreso de datos del libro ---");
        System.out.print("Título del libro: ");
        String tituloLibro = sc.nextLine();
        System.out.print("Precio del libro: ");
        float precioLibro = sc.nextFloat();
        System.out.print("Número de páginas: ");
        int paginas = sc.nextInt();
        System.out.print("Año de publicación: ");
        int anio = sc.nextInt();
        sc.nextLine();

        Libro libro = new Libro(tituloLibro, precioLibro, paginas, anio);

        System.out.println("\n--- Ingreso de datos del disco ---");
        System.out.print("Título del disco: ");
        String tituloDisco = sc.nextLine();
        System.out.print("Precio del disco: ");
        float precioDisco = sc.nextFloat();
        System.out.print("Duración (en minutos): ");
        float duracion = sc.nextFloat();

        Disco disco = new Disco(tituloDisco, precioDisco, duracion);

        System.out.println("\n=== Fichas registradas ===");
        libro.mostrar();
        disco.mostrar();

        sc.close();
    }
}
