package paqueteFiguraGeometrica;

public class FiguraGeometrica {
	
	
public FiguraGeometrica(int valor1, double area, double perimetro) {
		super();
		this.valor1 = valor1;
		this.area = area;
		this.perimetro = perimetro;
	}
public int valor1;
public double area;
public double perimetro;

public int getValor1() {
	return valor1;
}
public void setValor1(int valor1) {
	this.valor1 = valor1;
}
public double getArea() {
	return area;
}
public double getPerimetro() {
	return perimetro;
}
@Override
public String toString() {
	return "FiguraGeometrica [valor1=" + valor1 + ", area=" + area + ", perimetro=" + perimetro + "]";
}


}
