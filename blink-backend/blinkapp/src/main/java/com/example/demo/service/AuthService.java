package com.example.demo.service;

import com.example.demo.dto.UserLoginDto;
import com.example.demo.dto.UserRegisterDto;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    // In-memory OTP store
    private final Map<String, TempUserData> otpCache = new ConcurrentHashMap<>();

    private record TempUserData(UserRegisterDto dto, String otp, LocalDateTime expiry) {}

    public String register(UserRegisterDto dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return "User already exists!";
        }

        String otp = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(10);

        otpCache.put(dto.getEmail(), new TempUserData(dto, otp, expiry));

        emailService.sendOtpEmail(dto.getEmail(), otp);
        return "OTP sent to your email for verification.";
    }

    public String verifyOtp(String email, String otp) {
        TempUserData data = otpCache.get(email);
        if (data == null) {
            return "No OTP found or expired.";
        }

        if (LocalDateTime.now().isAfter(data.expiry())) {
            otpCache.remove(email);
            return "OTP expired.";
        }

        if (!data.otp().equals(otp)) {
            return "Invalid OTP.";
        }

        // OTP correct — create verified user
        UserRegisterDto dto = data.dto();
        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .mobileNumber(dto.getMobileNumber())
                .password(passwordEncoder.encode(dto.getPassword()))
                .verified(true)
                .build();

        userRepository.save(user);
        otpCache.remove(email);
        System.out.println("Current OTP Cache: " + otpCache.keySet());


        return "Email verified and user registered successfully!";
    }

    public Map<String, String> login(UserLoginDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.isVerified()) {
            throw new RuntimeException("Please verify your email before login.");
        }

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return Map.of("token", token);
    }

}
