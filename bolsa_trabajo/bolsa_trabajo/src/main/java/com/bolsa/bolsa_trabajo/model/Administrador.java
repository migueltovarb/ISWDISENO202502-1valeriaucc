package com.bolsa.bolsa_trabajo.model;

import com.bolsa.bolsa_trabajo.model.interfaces.IGestionable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "administradores")
public class Administrador extends Usuario implements IGestionable {
    private String codigoAdmin;
    private String areaResponsable;
    private List<String> permisos = new ArrayList<>();
    private String fotoUrl;
    
    @Override
    public void crear(Object objeto) {
        // Implementación para crear objetos gestionables
    }
    
    @Override
    public void modificar(Object objeto) {
        // Implementación para modificar objetos gestionables
    }
    
    @Override
    public void eliminar(Object objeto) {
        // Implementación para eliminar objetos gestionables
    }
    
    @Override
    public List<Object> listar() {
        return new ArrayList<>();
    }
}

