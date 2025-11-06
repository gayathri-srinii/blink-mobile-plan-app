package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.CustomPlan;
import java.util.List;

public interface CustomPlanRepository extends JpaRepository<CustomPlan, Long> {
    List<CustomPlan> findByUserEmail(String userEmail);
}
