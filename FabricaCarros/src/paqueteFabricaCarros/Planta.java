package paqueteFabricaCarros;

import java.util.ArrayList;
import java.util.List;

public class Planta {
    private String nombre;
    private Llanta tipoLlanta;
    private Chasis tipoChasis;
    private Color color;

    public Planta(String nombre, Llanta tipoLlanta, Chasis tipoChasis, Color color) {
        this.nombre = nombre;
        this.tipoLlanta = tipoLlanta;
        this.tipoChasis = tipoChasis;
        this.color = color;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Llanta getTipoLlanta() {
        return tipoLlanta;
    }

    public void setTipoLlanta(Llanta tipoLlanta) {
        this.tipoLlanta = tipoLlanta;
    }

    public Chasis getTipoChasis() {
        return tipoChasis;
    }

    public void setTipoChasis(Chasis tipoChasis) {
        this.tipoChasis = tipoChasis;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public Carro fabricar() {
        // Crea 4 llantas iguales
        List<Llanta> llantasDelCarro = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            llantasDelCarro.add(tipoLlanta);
        }

        // Usa el chasis y color de la planta
        Chasis chasisDelCarro = tipoChasis;
        Color colorDelCarro = color;

        // Crea y retorna el nuevo carro
        Carro nuevoCarro = new Carro(llantasDelCarro, chasisDelCarro, colorDelCarro);
        return nuevoCarro;
    }

    @Override
    public String toString() {
        return "Planta [nombre=" + nombre + ", color=" + color + "]";
    }
}
