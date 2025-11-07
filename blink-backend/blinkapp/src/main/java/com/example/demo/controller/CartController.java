package com.example.demo.controller;

import com.example.demo.entity.AddOn;
import com.example.demo.entity.BasePlan;
import com.example.demo.entity.Cart;
import com.example.demo.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // ✅ 1. Get all cart items for a specific user
    @GetMapping("/{userEmail}")
    public ResponseEntity<List<Cart>> getCart(@PathVariable String userEmail) {
        List<Cart> cartItems = cartService.getCart(userEmail);
        return ResponseEntity.ok(cartItems);
    }

    // ✅ 2. Add a base plan to the user's cart
    @PostMapping("/add/baseplan")
    public ResponseEntity<String> addBasePlan(
            @RequestParam String userEmail,
            @RequestBody BasePlan basePlan) {

        cartService.addBasePlan(userEmail, basePlan);
        return ResponseEntity.ok("Base plan added to cart successfully!");
    }

    // ✅ 3. Add an add-on to the user's cart
    @PostMapping("/add/addon")
    public ResponseEntity<String> addAddon(
            @RequestParam String userEmail,
            @RequestBody AddOn addon) {

        cartService.addAddon(userEmail, addon);
        return ResponseEntity.ok("Add-on added to cart successfully!");
    }

    // ✅ 4. Remove a base plan from user's cart
    @DeleteMapping("/remove/baseplan")
    public ResponseEntity<String> removeBasePlan(
            @RequestParam String userEmail,
            @RequestParam Long basePlanId) {

        cartService.removeBasePlan(userEmail, basePlanId);
        return ResponseEntity.ok("Base plan removed successfully!");
    }

    // ✅ 5. Remove an add-on from user's cart
    @DeleteMapping("/remove/addon")
    public ResponseEntity<String> removeAddon(
            @RequestParam String userEmail,
            @RequestParam Long addonId) {

        cartService.removeAddon(userEmail, addonId);
        return ResponseEntity.ok("Add-on removed successfully!");
    }

    // ✅ 6. Clear the entire cart for the user
    @DeleteMapping("/clear/{userEmail}")
    public ResponseEntity<String> clearCart(@PathVariable String userEmail) {
        cartService.clearCart(userEmail);
        return ResponseEntity.ok("Cart cleared successfully!");
    }
}
