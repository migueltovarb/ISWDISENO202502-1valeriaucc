package paquetePublicar;

public class Disco extends Publicacion {
    private float duracion;

    public Disco(String titulo, float precio, float duracion) {
        super(titulo, precio);
        this.duracion = duracion;
    }

    @Override
    public void mostrar() {
        System.out.println("\nDatos del Disco:");
        super.mostrar();
        System.out.println("Duración: " + duracion + " minutos");
    }
}
