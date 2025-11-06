package com.example.demo.service;

import com.example.demo.dto.UserProfileDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;
    
    public UserProfileDto getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserProfileDto dto = new UserProfileDto();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setMobileNumber(user.getMobileNumber());
        return dto;
    }

    public String updateProfile(String email, UserProfileDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(dto.getName());
        user.setMobileNumber(dto.getMobileNumber());
        userRepository.save(user);
        return "Profile updated successfully!";
    }
    
    public User registerUser(User user) {
        user.setVerified(false);
        userRepository.save(user); 

        // Generate a random token (UUID)
        String token = UUID.randomUUID().toString();
        // Save token in DB or a verification table if you have one

        emailService.sendVerificationEmail(user.getEmail(), token);
        return user;
    }

}



