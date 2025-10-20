package paquetePersonas;

public class Empleado extends Persona {
    protected int anioIncorporacion;
    protected String numeroDespacho;

    public Empleado(String nombre, String apellido, String id, String estadoCivil, int anioIncorporacion, String numeroDespacho) {
        super(nombre, apellido, id, estadoCivil);
        this.anioIncorporacion = anioIncorporacion;
        this.numeroDespacho = numeroDespacho;
    }

    public void reasignarDespacho(String nuevoDespacho) {
        this.numeroDespacho = nuevoDespacho;
    }

    @Override
    public void imprimir() {
        super.imprimir();
        System.out.println("Año de incorporación: " + anioIncorporacion);
        System.out.println("Despacho: " + numeroDespacho);
    }
}
