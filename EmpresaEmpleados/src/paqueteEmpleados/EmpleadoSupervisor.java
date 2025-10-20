package paqueteEmpleados;

public class EmpleadoSupervisor extends Empleado {
    private int numEmpleadosACargo;

    public EmpleadoSupervisor(String nombre, String apellidos, String dni, String direccion,
                              int antiguedad, String telefono, double salario, int numEmpleadosACargo) {
        super(nombre, apellidos, dni, direccion, antiguedad, telefono, salario);
        this.numEmpleadosACargo = numEmpleadosACargo;
    }

    @Override
    public void incrementarSalario(double porcentaje) {
        double bono = porcentaje + 10;
        super.incrementarSalario(bono);
    }

    @Override
    public String toString() {
        return super.toString() + "\nEmpleados a cargo: " + numEmpleadosACargo;
    }
}
