package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @ManyToOne
    @JoinColumn(name = "base_plan_id", nullable = true)
    private BasePlan basePlan;

    @ManyToOne
    @JoinColumn(name = "add_on_id", nullable = true)
    private AddOn addOn;
}
