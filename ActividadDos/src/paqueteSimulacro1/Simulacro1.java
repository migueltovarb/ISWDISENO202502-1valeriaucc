package paqueteSimulacro1;

import java.util.Scanner;

public class Simulacro1 {
	public static final double DESCUENTO_ROPA = 0.10;
	public static final double DESCUENTO_TECNO = 0.05;
	public static final double DESCUENTO_ALIM = 0.02;
	public static final double DESCUENTO_EXTRA = 0.05;
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int n = 0;
		while (n <= 0) {
			System.out.print("Cantidad de productos: ");
			n = sc.nextInt();
			if (n <= 0) {
				System.out.println("Debe ingresar minimo 1");
			}
		}
		
		String[] nombres = new String[n];
		int[] tipos = new int[n];
		double[] precios = new double[n];
		
		double totalSin = 0;
		double totalCon = 0;
		
		for (int i = 0; i < n; i++) {
			System.out.println("\nProducto " + (i + 1));
			System.out.print("Nombre: ");
			nombres[i] = sc.next();
			
			System.out.print("Tipo (1=Ropa, 2=Tecnologia, 3=Alimentos): ");
			tipos[i] = sc.nextInt();
			
			System.out.print("Precio: ");
			precios[i] = sc.nextDouble();
			
			totalSin += precios[i];
			
			double desc = 0;
			if (tipos[i] == 1) {
				desc = DESCUENTO_ROPA;
			} else if (tipos[i] == 2) {
				desc = DESCUENTO_TECNO;
			} else if (tipos[i] == 3) {
				desc = DESCUENTO_ALIM;
			} else {
				System.out.println("Tipo no valido");
			}
			
			double precioFinal = precios[i] - (precios[i] * desc);
			totalCon += precioFinal;
		}
		
		if (totalCon > 500000) {
			double extra = totalCon * DESCUENTO_EXTRA;
			totalCon -= extra;
			System.out.println("\nDescuento extra aplicado: $" + extra);
		}
		
		System.out.println("\n---RESULTADOS---");
		System.out.println("Total sin descuento: $" + totalSin);
		System.out.println("Total con descuento: $" + totalCon);
		System.out.println("Ahorro: $" + (totalSin - totalCon));
		
		sc.close();
	}
}

