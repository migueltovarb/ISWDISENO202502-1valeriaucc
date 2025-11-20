package com.vehiculos.vehiculos_api.service;

import com.vehiculos.vehiculos_api.model.Vehicle;
import java.util.List;

public interface VehicleService {

    Vehicle createVehicle(Vehicle vehicle);

    Vehicle getVehicleById(String id);

    List<Vehicle> getAllVehicles();

    Vehicle updateVehicle(String id, Vehicle vehicle);

    void deleteVehicle(String id);

}
