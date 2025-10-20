package paqueteEmpleadosBasico;

public class Empleado {
    // Atributos
    private String nombre;
    private String apellidos;
    private String dni;
    private String direccion;
    private int antiguedad;
    private String telefono;
    private double salario;
    private Empleado supervisor; // Relación con otro empleado

    //  POLIMORFISMO POR SOBRECARGA
    // Constructor completo
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

    // Constructor alternativo (sin antigüedad ni supervisor)
    public Empleado(String nombre, String apellidos, String dni, String direccion, double salario) {
        this(nombre, apellidos, dni, direccion, 0, "No asignado", salario);
    }

    // --- Métodos ---
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

    
    public String getNombre() { return nombre; }
    public double getSalario() { return salario; }
}
