package paquetePersonas;

public class Profesor extends Empleado {
    private String departamento;

    public Profesor(String nombre, String apellido, String id, String estadoCivil, int anioIncorporacion, String numeroDespacho, String departamento) {
        super(nombre, apellido, id, estadoCivil, anioIncorporacion, numeroDespacho);
        this.departamento = departamento;
    }

    public void cambiarDepartamento(String nuevoDepartamento) {
        this.departamento = nuevoDepartamento;
    }

    @Override
    public void imprimir() {
        super.imprimir();
        System.out.println("Departamento: " + departamento);
    }
}
