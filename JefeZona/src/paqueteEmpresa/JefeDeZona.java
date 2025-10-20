package paqueteEmpresa;

import java.util.ArrayList;

public class JefeDeZona extends Empleado {
    private String despacho;
    private String coche;
    private Secretario secretario;
    private ArrayList<Vendedor> vendedores;

    public JefeDeZona(String nombre, double salario, String despacho, String coche, Secretario secretario) {
        super(nombre, salario);
        this.despacho = despacho;
        this.coche = coche;
        this.secretario = secretario;
        this.vendedores = new ArrayList<>();
    }

    @Override
    public void incrementarSalario() {
        salario += salario * 0.20;
        System.out.println(nombre + " (Jefe de Zona) ha incrementado su salario un 20%. Nuevo salario: " + salario);
    }

    public void cambiarSecretario(Secretario nuevoSecretario) {
        this.secretario = nuevoSecretario;
        System.out.println(nombre + " ha cambiado de secretario a " + nuevoSecretario.nombre);
    }

    public void cambiarCoche(String nuevoCoche) {
        this.coche = nuevoCoche;
        System.out.println(nombre + " ahora tiene un nuevo coche: " + coche);
    }

    public void altaVendedor(Vendedor v) {
        vendedores.add(v);
        System.out.println("Se ha añadido el vendedor " + v.nombre + " al equipo de " + nombre);
    }

    public void bajaVendedor(Vendedor v) {
        vendedores.remove(v);
        System.out.println("Se ha eliminado el vendedor " + v.nombre + " del equipo de " + nombre);
    }

    @Override
    public void imprimirDatos() {
        System.out.println("Jefe de Zona: " + nombre + " | Despacho: " + despacho + " | Coche: " + coche + 
                           " | Salario: " + salario);
        System.out.println("Secretario: " + (secretario != null ? secretario.nombre : "Sin asignar"));
        System.out.println("Vendedores a cargo: " + vendedores.size());
    }
}
