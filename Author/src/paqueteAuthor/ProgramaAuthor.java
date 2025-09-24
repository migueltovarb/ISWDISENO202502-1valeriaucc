package paqueteAuthor;

public class ProgramaAuthor {

    public static void main(String[] args) {

        // Crear autores
        Author author1 = new Author("Valeria Torres", "valeria@example.com", 'f');
        Author author2 = new Author("Gabriel Gomez", "gabriel@example.com", 'm');

        // Mostrar autores
        System.out.println(author1);
        System.out.println(author2);

        // Probar getters
        System.out.println("Nombre: " + author1.getName());
        System.out.println("Email: " + author1.getEmail());
        System.out.println("Género: " + author1.getGender());

        // Cambiar email
        author1.setEmail("valeria.torres@correo.com");
        System.out.println("Nuevo email: " + author1.getEmail());

        // Mostrar autor actualizado
        System.out.println(author1);
    }
}
