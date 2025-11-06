package com.example.demo.repository;

import com.example.demo.entity.BasePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasePlanRepository extends JpaRepository<BasePlan, Long> {
}
