package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "base_plans")
public class BasePlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String plan_name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private BigDecimal data;


    @Column(nullable = false)
    private int validity; // in days

    @Column(nullable = false, length = 255)
    private String plan_type;

    @Column(nullable = false)
    private boolean ott_hotstar;

    @Column(nullable = false)
    private boolean ott_amazon;

    @Column(nullable = false)
    private boolean ott_netflix;

    @Column(nullable = false)
    private int sms; // number of SMS per day

    @Column(nullable = false)
    private boolean unlimited_calls;

    @Column(nullable = false)
    private boolean roaming;

    @Column(nullable = false)
    private boolean international_calls;

    @Column(nullable = false, length = 500)
    private String description;
}
