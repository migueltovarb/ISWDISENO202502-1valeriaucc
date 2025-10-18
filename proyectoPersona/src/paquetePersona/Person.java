package paquetePersona;

public class Person {
public String name;
public String adress;


public Person(String name, String adress) {
	super();
	this.name = name;
	this.adress = adress;
}
public String getName() {
    return name;
}

public String getAdress() {
    return adress;
}

public void setAdress(String adress) {
	this.adress=adress;
}
@Override
public String toString() {
	return "Person [name=" + name + ", adress=" + adress + "]";
}


}
