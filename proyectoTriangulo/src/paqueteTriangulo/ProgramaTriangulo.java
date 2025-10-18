package paqueteTriangulo;

public class ProgramaTriangulo {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		Acutangulo acutangulo = new Acutangulo(3, 5);
		Escaleno escaleno = new Escaleno(4, 6);
		
		//parte de la clase acutangulo
		acutangulo.calcularAreaHipotenusa(acutangulo.getLado(), acutangulo.getHipotenusa());
		acutangulo.perimetro();
		
		//parte de la clase escaleno
		escaleno.calcularAreaHipotenusa(escaleno.getLado(), escaleno.getHipotenusa());
		escaleno.perimetro();

	}

}
