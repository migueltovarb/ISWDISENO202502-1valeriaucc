package paqueteBook;

import paqueteAuthor.Author;

public class ProgramaBook {

    public static void main(String[] args) {
        
        // Crear un autor
        Author author1 = new Author("Valeria Torres", "valeria@example.com", 'f');
        
        // Crear libros con ese autor
        Book book1 = new Book("Programación en Java", author1, 120.50);
        Book book2 = new Book("Diseño de Software", author1, 200.00, 5);

        // Probar métodos
        System.out.println(book1);
        System.out.println(book2);

        // Obtener datos del libro
        System.out.println("Nombre del libro: " + book1.getName());
        System.out.println("Autor: " + book1.getAuthor().getName());
        System.out.println("Precio: " + book1.getPrice());
        System.out.println("Cantidad: " + book1.getQty());

        // Cambiar precio y cantidad
        book1.setPrice(150.75);
        book1.setQty(10);

        System.out.println("Nuevo precio: " + book1.getPrice());
        System.out.println("Nueva cantidad: " + book1.getQty());

        // Mostrar información final
        System.out.println(book1);
    }
}
