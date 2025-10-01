package paqueteSistemaRestaurantes;

import java.util.ArrayList;
import java.util.List;

public class Pedido {
    private static int contadorId = 1;
    private int id;
    private Cliente cliente;
    private List<Plato> platos;
    private double total;
    
    // Constructor
    public Pedido(Cliente cliente) {
        this.id = contadorId++;
        this.cliente = cliente;
        this.platos = new ArrayList<>();
        this.total = 0.0;
    }
    
    // Método para agregar plato al pedido
    public void agregarPlato(Plato plato) {
        platos.add(plato);
        calcularTotal();
    }
    
    // Método para eliminar plato del pedido
    public void eliminarPlato(Plato plato) {
        platos.remove(plato);
        calcularTotal();
    }
    
    // Método para calcular el total del pedido
    public double calcularTotal() {
        total = 0.0;
        for (Plato plato : platos) {
            total += plato.getPrecio();
        }
        return total;
    }
    
    // Método para mostrar resumen del pedido
    public String mostrarResumen() {
        StringBuilder resumen = new StringBuilder();
        resumen.append("\n========== RESUMEN DEL PEDIDO ==========\n");
        resumen.append("ID Pedido: ").append(id).append("\n");
        resumen.append(cliente.toString()).append("\n");
        resumen.append("----------------------------------------\n");
        resumen.append("PLATOS ORDENADOS:\n");
        
        for (int i = 0; i < platos.size(); i++) {
            resumen.append((i + 1)).append(". ").append(platos.get(i).toString()).append("\n");
        }
        
        resumen.append("----------------------------------------\n");
        resumen.append(String.format("TOTAL A PAGAR: $%.2f\n", total));
        resumen.append("========================================\n");
        
        return resumen.toString();
    }
    
    // Getters
    public int getId() {
        return id;
    }
    
    public Cliente getCliente() {
        return cliente;
    }
    
    public List<Plato> getPlatos() {
        return platos;
    }
    
    public double getTotal() {
        return total;
    }
}