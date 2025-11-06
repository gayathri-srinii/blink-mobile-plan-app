package com.example.demo.controller;

import com.example.demo.dto.UserProfileDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;

    @GetMapping("/{email}")
    public UserProfileDto getProfile(@PathVariable String email) {
        return userService.getProfile(email);
    }

    @PutMapping("/{email}")
    public String updateProfile(@PathVariable String email, @RequestBody UserProfileDto dto) {
        return userService.updateProfile(email, dto);
    }
    
    @PostMapping("/signup")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    
//    @GetMapping("/details")
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
    
    @GetMapping("/details")
    public Object getUserDetails(@RequestParam String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return Map.of(
                    "name", user.getName() != null ? user.getName() : "",
                    "email", user.getEmail() != null ? user.getEmail() : "",
                    "mobile_number", user.getMobileNumber() != null ? user.getMobileNumber() : "",
                    "verified", user.isVerified()
            );
        } else {
            return Map.of("message", "User not found");
        }
    }

    
    private Map<String, String> otpStorage = new HashMap<>();

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = String.valueOf((int)(Math.random() * 900000) + 100000); // 6-digit OTP
        otpStorage.put(email, otp);
        emailService.sendOtpEmail(email, otp);
        return ResponseEntity.ok("OTP sent to " + email);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");

        if (otpStorage.containsKey(email) && otpStorage.get(email).equals(otp)) {
            otpStorage.remove(email);
            return ResponseEntity.ok("OTP verified successfully!");
        }
        return ResponseEntity.badRequest().body("Invalid or expired OTP!");
    }
}


