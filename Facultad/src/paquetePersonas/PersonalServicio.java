package paquetePersonas;

public class PersonalServicio extends Empleado {
    private String seccion;

    public PersonalServicio(String nombre, String apellido, String id, String estadoCivil, int anioIncorporacion, String numeroDespacho, String seccion) {
        super(nombre, apellido, id, estadoCivil, anioIncorporacion, numeroDespacho);
        this.seccion = seccion;
    }

    public void trasladarSeccion(String nuevaSeccion) {
        this.seccion = nuevaSeccion;
    }

    @Override
    public void imprimir() {
        super.imprimir();
        System.out.println("Sección: " + seccion);
    }
}
