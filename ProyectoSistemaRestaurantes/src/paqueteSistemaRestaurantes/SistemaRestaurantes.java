package paqueteSistemaRestaurantes;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class SistemaRestaurantes {

    // ==== ATRIBUTOS ====
    private List<Plato> menu = new ArrayList<>();
    private List<Cliente> clientes = new ArrayList<>();
    private List<Pedido> pedidos = new ArrayList<>();

    // ==== MÉTODO MAIN ====
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        SistemaRestaurantes sistema = new SistemaRestaurantes();
        int opcion;

        System.out.println("=== BIENVENIDO AL SISTEMA DE PEDIDOS ===\n");

        // Cargar algunos datos de prueba
        System.out.println("Cargando datos iniciales...");
        cargarDatosPrueba(sistema);
        System.out.println("Datos cargados correctamente.\n");

        do {
            System.out.println("\n--- MENU PRINCIPAL ---");
            System.out.println("1. Registrar Plato");
            System.out.println("2. Registrar Cliente");
            System.out.println("3. Crear Pedido");
            System.out.println("4. Ver Menu");
            System.out.println("5. Ver Clientes");
            System.out.println("6. Ver Pedidos");
            System.out.println("7. Salir");
            System.out.print("Opcion: ");
            opcion = sc.nextInt();

            switch (opcion) {
                case 1:
                    registrarPlato(sc, sistema);
                    break;
                case 2:
                    registrarCliente(sc, sistema);
                    break;
                case 3:
                    crearPedido(sc, sistema);
                    break;
                case 4:
                    sistema.mostrarMenu();
                    break;
                case 5:
                    sistema.listarClientes();
                    break;
                case 6:
                    sistema.listarPedidos();
                    break;
                case 7:
                    System.out.println("\nGracias por usar el sistema. ¡Adiós!");
                    break;
                default:
                    System.out.println("Opción inválida.");
            }

        } while (opcion != 7);

        sc.close();
    }

    // ==== MÉTODOS ESTÁTICOS PARA EL MENÚ ====

    public static void registrarPlato(Scanner sc, SistemaRestaurantes sistema) {
        System.out.println("\n--- REGISTRAR PLATO ---");
        sc.nextLine(); // limpiar buffer

        System.out.print("Nombre: ");
        String nombre = sc.nextLine();

        System.out.print("Tipo (entrada/plato fuerte/bebida/postre): ");
        String tipo = sc.nextLine();

        System.out.print("Precio: ");
        double precio = sc.nextDouble();

        Plato plato = new Plato(nombre, tipo, precio);
        sistema.registrarPlato(plato);
        System.out.println("Plato registrado!");
    }

    public static void registrarCliente(Scanner sc, SistemaRestaurantes sistema) {
        System.out.println("\n--- REGISTRAR CLIENTE ---");
        sc.nextLine(); // limpiar buffer

        System.out.print("Nombre: ");
        String nombre = sc.nextLine();

        System.out.print("Teléfono: ");
        String telefono = sc.nextLine();

        Cliente cliente = new Cliente(nombre, telefono);
        sistema.registrarCliente(cliente);
        System.out.println("Cliente registrado!");
    }

    public static void crearPedido(Scanner sc, SistemaRestaurantes sistema) {
        System.out.println("\n--- CREAR PEDIDO ---");
        sc.nextLine(); // limpiar buffer

        if (sistema.getClientes().isEmpty()) {
            System.out.println("No hay clientes registrados.");
            return;
        }

        System.out.print("Teléfono del cliente: ");
        String telefono = sc.nextLine();
        Cliente cliente = sistema.buscarCliente(telefono);

        if (cliente == null) {
            System.out.println("Cliente no encontrado.");
            return;
        }

        Pedido pedido = sistema.crearPedido(cliente);

        String continuar = "s";
        while (continuar.equalsIgnoreCase("s")) {
            sistema.mostrarMenu();
            System.out.print("Número de plato: ");
            int num = sc.nextInt();

            Plato plato = sistema.obtenerPlato(num - 1);
            if (plato != null) {
                pedido.agregarPlato(plato);
                System.out.println("Plato agregado: " + plato.getNombre());
            } else {
                System.out.println("Plato no existe.");
            }

            System.out.print("¿Agregar otro plato? (s/n): ");
            continuar = sc.next();
        }

        System.out.println(pedido.mostrarResumen());
    }

    public static void cargarDatosPrueba(SistemaRestaurantes sistema) {
        sistema.registrarPlato(new Plato("Ensalada", "entrada", 5.00));
        sistema.registrarPlato(new Plato("Sopa", "entrada", 4.50));
        sistema.registrarPlato(new Plato("Bistec", "plato fuerte", 12.00));
        sistema.registrarPlato(new Plato("Pollo", "plato fuerte", 10.00));
        sistema.registrarPlato(new Plato("Refresco", "bebida", 2.50));
        sistema.registrarPlato(new Plato("Pastel", "postre", 6.00));

        sistema.registrarCliente(new Cliente("Juan", "123456"));
        sistema.registrarCliente(new Cliente("Maria", "789012"));
    }

    // ==== MÉTODOS DE INSTANCIA ====

    public void registrarPlato(Plato plato) {
        menu.add(plato);
    }

    public void registrarCliente(Cliente cliente) {
        clientes.add(cliente);
    }

    public void mostrarMenu() {
        System.out.println("\n--- MENU DEL RESTAURANTE ---");
        for (int i = 0; i < menu.size(); i++) {
            Plato p = menu.get(i);
            System.out.printf("%d. %s - %s - $%.2f\n", i + 1, p.getNombre(), p.getTipo(), p.getPrecio());
        }
    }

    public void listarClientes() {
        System.out.println("\n--- LISTA DE CLIENTES ---");
        for (Cliente c : clientes) {
            System.out.println("Nombre: " + c.getNombre() + ", Teléfono: " + c.getNumeroContacto());
        }
    }

    public void listarPedidos() {
        System.out.println("\n--- LISTA DE PEDIDOS ---");
        for (Pedido p : pedidos) {
            System.out.println(p.mostrarResumen());
        }
    }

    public List<Cliente> getClientes() {
        return clientes;
    }

    public Cliente buscarCliente(String numeroContacto) {
        for (Cliente c : clientes) {
            if (c.getNumeroContacto().equals(numeroContacto)) {
                return c;
            }
        }
        return null;
    }

    public Pedido crearPedido(Cliente cliente) {
        Pedido pedido = new Pedido(cliente);
        pedidos.add(pedido);
        return pedido;
    }

    public Plato obtenerPlato(int index) {
        if (index >= 0 && index < menu.size()) {
            return menu.get(index);
        }
        return null;
    }
}
