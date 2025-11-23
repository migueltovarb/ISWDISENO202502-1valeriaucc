package com.bolsa.bolsa_trabajo.model.interfaces;

import java.util.List;

public interface IGestionable {
    void crear(Object objeto);
    void modificar(Object objeto);
    void eliminar(Object objeto);
    List<Object> listar();
}

