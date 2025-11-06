package com.example.demo.controller;

import com.example.demo.entity.BasePlan;
import com.example.demo.service.BasePlanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/baseplans")
@CrossOrigin("*")
public class BasePlanController {

    private final BasePlanService basePlanService;

    public BasePlanController(BasePlanService basePlanService) {
        this.basePlanService = basePlanService;
    }

    @PostMapping("/add")
    public BasePlan addPlan(@RequestBody BasePlan plan) {
        return basePlanService.addPlan(plan);
    }

    @GetMapping("/all")
    public List<BasePlan> getAllPlans() {
        return basePlanService.getAllPlans();
    }

    @DeleteMapping("/delete/{id}")
    public String deletePlan(@PathVariable Long id) {
        basePlanService.deletePlan(id);
        return "Plan deleted successfully!";
    }
}
