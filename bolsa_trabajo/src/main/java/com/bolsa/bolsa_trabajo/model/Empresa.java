package com.bolsa.bolsa_trabajo.model;

import com.bolsa.bolsa_trabajo.model.interfaces.IGestionable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "empresas")
public class Empresa extends Usuario implements IGestionable {
    @Indexed(unique = true)
    private String nombreEmpresa;
    
    @Indexed(unique = true)
    private String nit;
    
    private String descripcion;
    private String ubicacion;
    private String fotoUrl;
    private String sector;
    private String telefonoContacto;
    
    @DocumentReference(lazy = true)
    private List<OfertaDeTrabajo> ofertas = new ArrayList<>();
    
    @Override
    public void crear(Object objeto) {
        if (objeto instanceof OfertaDeTrabajo) {
            OfertaDeTrabajo oferta = (OfertaDeTrabajo) objeto;
            if (this.ofertas == null) {
                this.ofertas = new ArrayList<>();
            }
            this.ofertas.add(oferta);
        }
    }
    
    @Override
    public void modificar(Object objeto) {
        // Implementación específica para modificar ofertas
    }
    
    @Override
    public void eliminar(Object objeto) {
        if (objeto instanceof OfertaDeTrabajo) {
            this.ofertas.remove(objeto);
        }
    }
    
    @Override
    public List<Object> listar() {
        return new ArrayList<>(this.ofertas);
    }
}

