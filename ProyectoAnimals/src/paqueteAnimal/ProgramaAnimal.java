package paqueteAnimal;
public class ProgramaAnimal {

    public static void main(String[] args) {

        Animal a = new Animal("Animal generico");
        System.out.println(a);

        Mamifero m = new Mamifero("Mamifero generico");
        System.out.println(m);

        Gato g = new Gato("Beto");
        System.out.println(g);
        g.saludar();

        Perro p1 = new Perro("Princesa");
        Perro p2 = new Perro("Tobias");
        System.out.println(p1);
        p1.saludar();
        p1.saludar(p2);
    }
}
