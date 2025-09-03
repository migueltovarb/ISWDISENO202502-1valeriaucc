
package paqueteMiTaller;

import java.util.Scanner;

public class PrimerTaller {
	public static final int DIAS_SEMANA = 5;
	public static final int NUM_ESTUDIANTES = 4;
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		char[][] asistencia = new char[NUM_ESTUDIANTES][DIAS_SEMANA];
		boolean datosLlenados = false;
		int opcion = 0;

		while (opcion != 4) {
			System.out.println("---CONTROL DE ASISTENCIA---");
			System.out.println("\n1. Ver asistencia individual");
			System.out.println("2. Ver resumen general");
			System.out.println("3. Registrar asistencia");
			System.out.println("4. Salir");
			System.out.print("Opcion: ");
			opcion = sc.nextInt();

			if (opcion == 1) {
				if (!datosLlenados) {
					System.out.println("Primero registre asistencia");
				} else {
					System.out.print("Numero de estudiante (1-4): ");
					int est = sc.nextInt();
					if (est >= 1 && est <= NUM_ESTUDIANTES) {
						System.out.print("Asistencia: ");
						for (int d = 0; d < DIAS_SEMANA; d++) {
							System.out.print(asistencia[est - 1][d] + " ");
						}
						System.out.println();
					} else {
						System.out.println("Estudiante no valido");
					}
				}
			} else if (opcion == 2) {
				if (!datosLlenados) {
					System.out.println("Primero registre asistencia");
				} else {
					for (int i = 0; i < NUM_ESTUDIANTES; i++) {
						int total = 0;
						for (int j = 0; j < DIAS_SEMANA; j++) {
							if (asistencia[i][j] == 'P') {
								total++;
							}
						}
						System.out.println("Estudiante " + (i + 1) + ": " + total + " asistencias");
					}
					System.out.print("Estudiantes que asistieron todos los dias: ");
					for (int i = 0; i < NUM_ESTUDIANTES; i++) {
						boolean todos = true;
						for (int j = 0; j < DIAS_SEMANA; j++) {
							if (asistencia[i][j] == 'A') {
								todos = false;
								break;
							}
						}
						if (todos) {
							System.out.print((i + 1) + " ");
						}
					}
					System.out.println();
					int maxAusencias = 0;
					int diaMasAusencias = -1;
					for (int d = 0; d < DIAS_SEMANA; d++) {
						int ausencias = 0;
						for (int e = 0; e < NUM_ESTUDIANTES; e++) {
							if (asistencia[e][d] == 'A') {
								ausencias++;
							}
						}
						if (ausencias > maxAusencias) {
							maxAusencias = ausencias;
							diaMasAusencias = d;
						}
					}
					if (diaMasAusencias != -1) {
						System.out.println("Dia con mas ausencias: " + (diaMasAusencias + 1));
					}
				}
			} else if (opcion == 3) {
				if (datosLlenados) {
					System.out.println("La asistencia ya fue registrada");
				} else {
					for (int i = 0; i < NUM_ESTUDIANTES; i++) {
						System.out.println("Estudiante " + (i + 1));
						for (int j = 0; j < DIAS_SEMANA; j++) {
							char valor;
							do {
								System.out.print("Dia " + (j + 1) + " (P/A): ");
								valor = sc.next().toUpperCase().charAt(0);
							} while (valor != 'P' && valor != 'A');
							asistencia[i][j] = valor;
						}
					}
					datosLlenados = true;
					System.out.println("El registro ha sido completado");
				}
			} else if (opcion == 4) {
				System.out.println("\n---GRACIAS POR VER MI PROGRAMA---");
			} else {
				System.out.println("Opcion incorrecta");
			}
		}
		sc.close();
	}
}
