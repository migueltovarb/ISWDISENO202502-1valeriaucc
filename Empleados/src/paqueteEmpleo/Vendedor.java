package paqueteEmpleo;

public class Vendedor extends Empleado {
    private String coche;
    private double porcentajeComision;

    public Vendedor(String nombre, double salario, String coche, double porcentajeComision) {
        super(nombre, salario);
        this.coche = coche;
        this.porcentajeComision = porcentajeComision;
    }

    // Polimorfismo por sobreescritura
    @Override
    public void incrementarSalario() {
        salario += salario * 0.10;
        System.out.println(nombre + " (Vendedor) ha incrementado su salario un 10%. Nuevo salario: " + salario);
    }

    @Override
    public void imprimirDatos() {
        System.out.println("Vendedor: " + nombre + " | Coche: " + coche + " | Comisión: " + porcentajeComision + "% | Salario: " + salario);
    }
}
