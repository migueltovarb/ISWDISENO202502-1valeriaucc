package paqueteAnimal;
public class Mamifero extends Animal {

    public Mamifero(String nombre) {
        super(nombre); // Llama al constructor de Animal
    }

    public String toString() {
        return "Mamifero[" + super.toString() + "]";
    }
}
