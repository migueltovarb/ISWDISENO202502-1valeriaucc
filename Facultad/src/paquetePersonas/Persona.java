package paquetePersonas;

public class Persona {
    protected String nombre;
    protected String apellido;
    protected String id;
    protected String estadoCivil;

    public Persona(String nombre, String apellido, String id, String estadoCivil) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.id = id;
        this.estadoCivil = estadoCivil;
    }

    public void cambiarEstadoCivil(String nuevoEstado) {
        this.estadoCivil = nuevoEstado;
    }

    public void imprimir() {
        System.out.println("Nombre: " + nombre + " " + apellido);
        System.out.println("ID: " + id);
        System.out.println("Estado civil: " + estadoCivil);
    }
}
