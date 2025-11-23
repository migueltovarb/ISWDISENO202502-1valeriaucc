package com.bolsa.bolsa_trabajo.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

import java.util.concurrent.TimeUnit;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Override
    protected String getDatabaseName() {
        return "bolsa_trabajo";
    }

    @Override
    @Bean
    public MongoClient mongoClient() {
        ConnectionString connectionString = new ConnectionString(mongoUri);
        
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .applyToSocketSettings(builder -> builder
                        .connectTimeout(60000, TimeUnit.MILLISECONDS)
                        .readTimeout(60000, TimeUnit.MILLISECONDS))
                .applyToClusterSettings(builder -> builder
                        .serverSelectionTimeout(60000, TimeUnit.MILLISECONDS))
                .applyToConnectionPoolSettings(builder -> builder
                        .maxSize(10)
                        .minSize(2))
                .retryWrites(true)
                .retryReads(true)
                .build();

        return MongoClients.create(settings);
    }
}

