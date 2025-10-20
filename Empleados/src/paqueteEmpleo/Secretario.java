package paqueteEmpleo;

public class Secretario extends Empleado {
    private String despacho;
    private String fax;

    public Secretario(String nombre, double salario, String despacho, String fax) {
        super(nombre, salario);
        this.despacho = despacho;
        this.fax = fax;
    }

    // Polimorfismo por sobreescritura
    @Override
    public void incrementarSalario() {
        salario += salario * 0.05;
        System.out.println(nombre + " (Secretario) ha incrementado su salario un 5%. Nuevo salario: " + salario);
    }

    @Override
    public void imprimirDatos() {
        System.out.println("Secretario: " + nombre + " | Despacho: " + despacho + " | Fax: " + fax + " | Salario: " + salario);
    }
}
