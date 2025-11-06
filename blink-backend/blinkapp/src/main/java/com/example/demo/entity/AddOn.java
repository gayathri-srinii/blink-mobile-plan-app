package com.example.demo.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "add_ons")
public class AddOn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private boolean perplexity_ai;

    @Column(nullable = false)
    private boolean youtube_premium;

    @Column(nullable = false)
    private BigDecimal extra_data; // in GB

    @Column(nullable = false)
    private int extra_sms;

    @Column(nullable = false)
    private boolean hotspot; // extra feature

    @Column(nullable = false)
    private boolean roaming_pack; // roaming support
}
