package paqueteBanco;

public class Banco {
private String titular;
private double Cantidad;

public Banco(String titular) {
	super();
	this.titular = titular;
	
}

public Banco(String titular, double cantidad) {
	super();
	this.titular = titular;
	Cantidad = cantidad;
}
public String getTitular() {
	return titular;
}
public void setTitular(String titular) {
	this.titular = titular;
}
public double getCantidad() {
	return Cantidad;
}
public void setCantidad(double cantidad) {
	Cantidad = cantidad;
}

public void ingresarCantidad(double cantidad){

if(cantidad>0) {
	this.Cantidad+=cantidad;
	
	
} else {
	System.out.println("No se puede ingresar una cantidad negativa");
}
}

public void retirarCantidad(double cantidad) {
	if (this.Cantidad - cantidad < 0) {
		this.Cantidad = 0;
	} else {
		this.Cantidad -= cantidad;
	}
}

@Override
public String toString() {
	return "Banco [titular=" + titular + ", Cantidad=" + Cantidad + "]";
}


}



