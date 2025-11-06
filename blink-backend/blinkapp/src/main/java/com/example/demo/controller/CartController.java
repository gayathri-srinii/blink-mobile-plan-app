package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addItem(@RequestBody Cart cartItem) {
        cartRepository.save(cartItem);
        return ResponseEntity.ok("Item added to cart successfully!");
    }

    @GetMapping("/{userEmail}")
    public List<Cart> getCartItems(@PathVariable String userEmail) {
        return cartRepository.findByUserEmail(userEmail);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeItem(@PathVariable Long id) {
        cartRepository.deleteById(id);
        return ResponseEntity.ok("Item removed from cart!");
    }

    @DeleteMapping("/clear/{userEmail}")
    public ResponseEntity<String> clearCart(@PathVariable String userEmail) {
        cartRepository.deleteByUserEmail(userEmail);
        return ResponseEntity.ok("Cart cleared for user: " + userEmail);
    }
}
