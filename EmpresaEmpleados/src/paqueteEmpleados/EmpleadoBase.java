package paqueteEmpleados;

public class EmpleadoBase extends Empleado {

    public EmpleadoBase(String nombre, String apellidos, String dni, String direccion,
                        int antiguedad, String telefono, double salario) {
        super(nombre, apellidos, dni, direccion, antiguedad, telefono, salario);
    }

    @Override
    public void incrementarSalario(double porcentaje) {
        if (antiguedad > 2) {
            super.incrementarSalario(porcentaje);
        } else {
            System.out.println(nombre + " aún no cumple la antigüedad mínima para aumento.");
        }
    }
}
