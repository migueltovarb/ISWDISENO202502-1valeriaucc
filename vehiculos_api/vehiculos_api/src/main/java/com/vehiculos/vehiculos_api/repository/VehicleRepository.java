package com.vehiculos.vehiculos_api.repository;

import com.vehiculos.vehiculos_api.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends MongoRepository<Vehicle, String> {

}
