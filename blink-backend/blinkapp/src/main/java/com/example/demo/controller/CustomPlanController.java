package com.example.demo.controller;

import com.example.demo.entity.CustomPlan;
import com.example.demo.repository.CustomPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/custom-plan")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomPlanController {

    @Autowired
    private CustomPlanRepository customPlanRepository;

    @PostMapping("/create")
    public ResponseEntity<CustomPlan> createCustomPlan(@RequestBody CustomPlan customPlan) {
        CustomPlan savedPlan = customPlanRepository.save(customPlan);
        return ResponseEntity.ok(savedPlan);
    }

    @GetMapping("/{userEmail}")
    public List<CustomPlan> getUserCustomPlans(@PathVariable String userEmail) {
        return customPlanRepository.findByUserEmail(userEmail);
    }
    
    @GetMapping("/id/{id}")
    public ResponseEntity<CustomPlan> getCustomPlanById(@PathVariable Long id) {
        return customPlanRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
