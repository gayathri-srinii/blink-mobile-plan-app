package com.example.demo.repository;

import com.example.demo.entity.Orders;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Orders, Long> {
	List<Orders> findByUserEmail(String userEmail);
}
