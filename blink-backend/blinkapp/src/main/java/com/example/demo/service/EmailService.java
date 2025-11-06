package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String toEmail, String token) {
        String subject = "Verify your Blink App account";
        String verificationUrl = "http://localhost:5173/verify-email?token=" + token;

        String body = "Hi,\n\nPlease click the link below to verify your email:\n" 
                      + verificationUrl 
                      + "\n\nThank you,\nBlink App Team";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
    public void sendOtpEmail(String toEmail, String otp) {
        String subject = "Blink App - Verify Your Email";
        String body = """
                Dear User,
                
                Your One-Time Password (OTP) for Blink App verification is: %s
                
                This OTP is valid for 10 minutes.
                
                If you did not request this, please ignore this email.
                
                Regards,
                Blink App Team
                """.formatted(otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
