package com.vehiculos.vehiculos_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Permitir credenciales (cookies, headers de autenticación, etc.)
        config.setAllowCredentials(true);
        
        // Permitir el origen del frontend
        config.addAllowedOrigin("http://localhost:3000");
        
        // Permitir todos los métodos HTTP (GET, POST, PUT, DELETE, OPTIONS, etc.)
        config.addAllowedMethod("*");
        
        // Permitir todos los headers
        config.addAllowedHeader("*");
        
        // Exponer headers específicos al frontend
        config.addExposedHeader("Authorization");
        config.addExposedHeader("Content-Type");
        
        // Aplicar esta configuración a todas las rutas
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}