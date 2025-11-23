package com.bolsa.bolsa_trabajo.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Override
    protected String getDatabaseName() {
        // Debe coincidir con la base especificada en la URI
        return "bolsa_trabajo";
    }

    @Override
    @Bean
    public MongoClient mongoClient() {
        // Utilizar exclusivamente la URI definida en application.properties
        // Esto evita configuraciones duplicadas y reduce ruido en logs
        return MongoClients.create(mongoUri);
    }
}
