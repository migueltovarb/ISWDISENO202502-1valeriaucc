package paqueteEmpleados;

public class Empleado {
    protected String nombre;
    protected String apellidos;
    protected String dni;
    protected String direccion;
    protected int antiguedad;
    protected String telefono;
    protected double salario;
    protected Empleado supervisor;

    public Empleado(String nombre, String apellidos, String dni, String direccion,
                    int antiguedad, String telefono, double salario) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dni = dni;
        this.direccion = direccion;
        this.antiguedad = antiguedad;
        this.telefono = telefono;
        this.salario = salario;
        this.supervisor = null;
    }

    public void cambiarSupervisor(Empleado nuevoSupervisor) {
        this.supervisor = nuevoSupervisor;
    }

    public void incrementarSalario(double porcentaje) {
        salario += salario * (porcentaje / 100);
    }

    @Override
    public String toString() {
        String infoSupervisor = (supervisor != null) ? supervisor.nombre : "Sin supervisor";
        return "\nEmpleado: " + nombre + " " + apellidos +
               "\nDNI: " + dni +
               "\nDirección: " + direccion +
               "\nAntigüedad: " + antiguedad + " años" +
               "\nTeléfono: " + telefono +
               "\nSalario: $" + salario +
               "\nSupervisor: " + infoSupervisor;
    }
}
