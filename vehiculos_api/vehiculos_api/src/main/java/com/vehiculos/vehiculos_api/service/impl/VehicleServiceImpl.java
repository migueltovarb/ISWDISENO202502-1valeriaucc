package com.vehiculos.vehiculos_api.service.impl;

import com.vehiculos.vehiculos_api.exception.ResourceNotFoundException;
import com.vehiculos.vehiculos_api.model.Vehicle;
import com.vehiculos.vehiculos_api.repository.VehicleRepository;
import com.vehiculos.vehiculos_api.service.VehicleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository repository;

    public VehicleServiceImpl(VehicleRepository repository) {
        this.repository = repository;
    }

    @Override
    public Vehicle createVehicle(Vehicle vehicle) {
        // Aquí se pueden añadir reglas de negocio (p. ej. validaciones adicionales)
        return repository.save(vehicle);
    }

    @Override
    public Vehicle getVehicleById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con id: " + id));
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return repository.findAll();
    }

    @Override
    public Vehicle updateVehicle(String id, Vehicle vehicle) {
        Vehicle existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con id: " + id));

        if (vehicle.getMarca() != null) existing.setMarca(vehicle.getMarca());
        if (vehicle.getModelo() != null) existing.setModelo(vehicle.getModelo());
        if (vehicle.getAnio() != null) existing.setAnio(vehicle.getAnio());
        if (vehicle.getColor() != null) existing.setColor(vehicle.getColor());
        if (vehicle.getPrecio() != null) existing.setPrecio(vehicle.getPrecio());

        return repository.save(existing);
    }

    @Override
    public void deleteVehicle(String id) {
        Vehicle existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con id: " + id));
        repository.delete(existing);
    }
}
