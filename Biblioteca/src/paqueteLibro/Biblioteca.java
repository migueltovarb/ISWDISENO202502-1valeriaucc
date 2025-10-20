package paqueteLibro;

interface Prestable {
    void prestar();
    void devolver();
    boolean prestado();
}

abstract class Publicacion {
    private String codigo;
    private String titulo;
    private int anioPublicacion;

    public Publicacion(String codigo, String titulo, int anioPublicacion) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.anioPublicacion = anioPublicacion;
    }

    public String getCodigo() {
        return codigo;
    }

    public int getAnioPublicacion() {
        return anioPublicacion;
    }

    @Override
    public String toString() {
        return "Código: " + codigo + ", Título: " + titulo + ", Año: " + anioPublicacion;
    }
}

class Libro extends Publicacion implements Prestable {
    private boolean estaPrestado;

    public Libro(String codigo, String titulo, int anioPublicacion) {
        super(codigo, titulo, anioPublicacion);
        this.estaPrestado = false;
    }

    @Override
    public void prestar() {
        if (!estaPrestado) {
            estaPrestado = true;
            System.out.println("El libro ha sido prestado.");
        } else {
            System.out.println("El libro ya estaba prestado.");
        }
    }

    @Override
    public void devolver() {
        if (estaPrestado) {
            estaPrestado = false;
            System.out.println("El libro ha sido devuelto.");
        } else {
            System.out.println("El libro no estaba prestado.");
        }
    }

    @Override
    public boolean prestado() {
        return estaPrestado;
    }

    @Override
    public String toString() {
        return super.toString() + ", Prestado: " + (estaPrestado ? "Sí" : "No");
    }
}

class Revista extends Publicacion {
    private int numero;

    public Revista(String codigo, String titulo, int anioPublicacion, int numero) {
        super(codigo, titulo, anioPublicacion);
        this.numero = numero;
    }

    @Override
    public String toString() {
        return super.toString() + ", Número: " + numero;
    }
}

public class Biblioteca {
    public static void main(String[] args) {
        Libro libro1 = new Libro("L001", "Cien Años de Soledad", 1967);
        Libro libro2 = new Libro("L002", "Don Quijote de la Mancha", 1605);
        Revista revista1 = new Revista("R001", "National Geographic", 2024, 157);

        System.out.println("Información inicial:");
        System.out.println(libro1);
        System.out.println(libro2);
        System.out.println(revista1);

        System.out.println("\nPrestando el primer libro...");
        libro1.prestar();

        System.out.println("\nEstado actual:");
        System.out.println(libro1);

        System.out.println("\nIntentando prestar nuevamente el mismo libro...");
        libro1.prestar();

        System.out.println("\nDevolviendo el libro...");
        libro1.devolver();

        System.out.println("\nEstado final:");
        System.out.println(libro1);
    }
}
