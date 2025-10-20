package paquetePersonas;

public class Estudiante extends Persona {
    private String curso;

    public Estudiante(String nombre, String apellido, String id, String estadoCivil, String curso) {
        super(nombre, apellido, id, estadoCivil);
        this.curso = curso;
    }

    public void matricularNuevoCurso(String nuevoCurso) {
        this.curso = nuevoCurso;
    }

    @Override
    public void imprimir() {
        super.imprimir();
        System.out.println("Curso actual: " + curso);
    }
}
