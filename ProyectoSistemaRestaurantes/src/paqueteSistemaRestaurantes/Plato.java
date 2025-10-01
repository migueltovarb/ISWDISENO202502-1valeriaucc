package paqueteSistemaRestaurantes;

public class Plato {
    private String nombre;
    private String tipo; // entrada, plato fuerte, bebida, postre
    private double precio;
    
    // Constructor
    public Plato(String nombre, String tipo, double precio) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
    }
    
    // Getters
    public String getNombre() {
        return nombre;
    }
    
    public String getTipo() {
        return tipo;
    }
    
    public double getPrecio() {
        return precio;
    }
    
    // Setters
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
    public void setPrecio(double precio) {
        this.precio = precio;
    }
    
    @Override
    public String toString() {
        return String.format("%s (%s) - $%.2f", nombre, tipo, precio);
    }
}