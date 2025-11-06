package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BlinkappApplication {
    public static void main(String[] args) {
        SpringApplication.run(BlinkappApplication.class, args);
        System.out.println("🚀 BlinkApp Backend Running...");
    }
}
