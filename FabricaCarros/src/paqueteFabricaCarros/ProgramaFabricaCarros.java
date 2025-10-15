package paqueteFabricaCarros;

import java.util.ArrayList;
import java.util.List;

public class ProgramaFabricaCarros {

    public static void main(String[] args) {
        // Modelos base de componentes
        Chasis chasisModelo = new Chasis(500f, Material.ACERO);
        Llanta llantaModelo = new Llanta(16f, "TodoTerreno");

        // Crea planta
        Planta miPlanta = new Planta("Planta Pasto", llantaModelo, chasisModelo, Color.AZUL);

        // Lista de plantas
        List<Planta> listadoPlantas = new ArrayList<>();
        listadoPlantas.add(miPlanta);

        // Crea la fábrica
        Fabrica miFabrica = new Fabrica("Chevrolet", listadoPlantas);

        // Fabrica un nuevo carro
        Carro miNuevoCarro = miPlanta.fabricar();

        // Muestra el resultado
        System.out.println(miNuevoCarro);
        System.out.println(miFabrica);
    }
}
