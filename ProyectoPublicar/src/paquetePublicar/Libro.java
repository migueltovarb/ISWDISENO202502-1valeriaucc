package paquetePublicar;

public class Libro extends Publicacion {
    private int paginas;
    private int anioPublicacion;

    public Libro(String titulo, float precio, int paginas, int anioPublicacion) {
        super(titulo, precio);
        this.paginas = paginas;
        this.anioPublicacion = anioPublicacion;
    }

    @Override
    public void mostrar() {
        System.out.println("\nDatos del Libro:");
        super.mostrar();
        System.out.println("Número de páginas: " + paginas);
        System.out.println("Año de publicación: " + anioPublicacion);
    }
}
