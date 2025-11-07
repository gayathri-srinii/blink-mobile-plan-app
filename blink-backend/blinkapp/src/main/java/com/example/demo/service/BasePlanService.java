package com.example.demo.service;

import com.example.demo.entity.BasePlan;
import com.example.demo.repository.BasePlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BasePlanService {

    private final BasePlanRepository basePlanRepository;

    public BasePlanService(BasePlanRepository basePlanRepository) {
        this.basePlanRepository = basePlanRepository;
    }

    public BasePlan addPlan(BasePlan plan) {
        return basePlanRepository.save(plan);
    }
    
    public BasePlan getPlanById(Long id) {
        return basePlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Base plan not found with id: " + id));
    }

    public List<BasePlan> getAllPlans() {
        return basePlanRepository.findAll();
    }

    public void deletePlan(Long id) {
        basePlanRepository.deleteById(id);
    }
}
