package paqueteEmpresa;

public class Empleado {
    protected String nombre;
    protected double salario;

    public Empleado(String nombre, double salario) {
        this.nombre = nombre;
        this.salario = salario;
    }

    public void incrementarSalario() {
        System.out.println(nombre + ": aumento general de salario.");
    }

    public void imprimirDatos() {
        System.out.println("Empleado: " + nombre + " | Salario: " + salario);
    }
}
