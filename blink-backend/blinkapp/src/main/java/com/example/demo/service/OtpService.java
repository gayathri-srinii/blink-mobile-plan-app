package com.example.demo.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Random;

@Service
public class OtpService {

    // store OTPs temporarily (email -> OtpData)
    private final Map<String, OtpData> otpStore = new ConcurrentHashMap<>();

    // inner class to hold OTP info
    private static class OtpData {
        String otp;
        LocalDateTime expiryTime;

        OtpData(String otp, LocalDateTime expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }
    }

    // Generate a 6-digit OTP (valid for 10 mins)
    public String generateOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(10);
        otpStore.put(email, new OtpData(otp, expiry));
        return otp;
    }

    // Verify OTP for an email
    public boolean verifyOtp(String email, String otp) {
        OtpData data = otpStore.get(email);
        if (data == null) return false;
        if (LocalDateTime.now().isAfter(data.expiryTime)) {
            otpStore.remove(email);
            return false; // expired
        }
        boolean valid = data.otp.equals(otp);
        if (valid) otpStore.remove(email); // remove once verified
        return valid;
    }

    // Optional: cleanup expired OTPs every 1 minute
    @Scheduled(fixedRate = 60000)
    public void cleanupExpiredOtps() {
        otpStore.entrySet().removeIf(entry ->
                LocalDateTime.now().isAfter(entry.getValue().expiryTime));
    }
}
