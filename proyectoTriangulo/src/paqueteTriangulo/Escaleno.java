package paqueteTriangulo;

public class Escaleno extends TrianguloBase {
	
	public Escaleno(int lado, int hipotenusa) {
		super(lado, hipotenusa);
		// TODO Auto-generated constructor stub
	}

	@Override
	void perimetro() {
		double otroLado = Math.sqrt((hipotenusa*hipotenusa) - (lado*lado));
		double perimetro = lado + otroLado + hipotenusa;
		System.out.println("El perimetro del triangulo Escaleno es de: " + perimetro);
	}

}
