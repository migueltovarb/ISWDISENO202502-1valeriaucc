package paqueteInvoiceItem;

public class TestInvoiceItem {
    public static void main(String[] args) {
        InvoiceItem item1 = new InvoiceItem("A101", "Laptop Lenovo", 2, 3500000);

        System.out.println(item1);
        System.out.println("ID: " + item1.getId());
        System.out.println("Descripción: " + item1.getDesc());
        System.out.println("Cantidad: " + item1.getQty());
        System.out.println("Precio unitario: " + item1.getUnitPrice());
        System.out.println("Total: " + item1.getTotal());

        // Cambiar cantidad
        item1.setQty(3);
        System.out.println("Nueva cantidad: " + item1.getQty());
        System.out.println("Nuevo total: " + item1.getTotal());

        // Cambiar precio
        item1.setUnitPrice(3300000);
        System.out.println("Nuevo precio unitario: " + item1.getUnitPrice());
        System.out.println("Nuevo total: " + item1.getTotal());

        System.out.println(item1);
    }
}
