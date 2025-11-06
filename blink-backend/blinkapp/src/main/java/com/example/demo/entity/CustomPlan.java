package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "custom_plans")
public class CustomPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Unique ID for the custom plan

    @Column(name="user_email",nullable = false)
    private String userEmail;  // Identifies the user who created the plan

    @Column(name="data_limit",nullable = false)
    private BigDecimal dataLimit;  // Data in GB selected by the user

    @Column(name="sms_count",nullable = false)
    private Integer smsCount;  // SMS count selected

    @Column(name="validity_days",nullable = false)
    private Integer validityDays;  // Validity of the plan in days

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;  // Final calculated price

    @Column(name="youtube_premium",nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean youtubePremium;  // YouTube Premium selected or not

    @Column(name="netflix_subscription",nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean netflixSubscription;  // Netflix Subscription selected or not

    @Column(name="extra_data_booster",nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean extraDataBooster;  // Extra Data Booster selected or not

    @Column(name="prime_membership",nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean primeMembership;  // Amazon Prime Membership selected or not

    @Column(name="hotstar_subscription",nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean hotstarSubscription;  // Hotstar Subscription selected or not

    @Column(name="music_pack",nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean musicPack;  // Music Pack selected or not

    @Column(name="created_at",nullable = false, updatable = false, insertable = false, 
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;  // When the plan was created

    @Column(nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'active'")
    private String status;  // Status of the plan (‘active’, ‘expired’, etc.)
}
