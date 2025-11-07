package com.example.demo.service;

import com.example.demo.entity.AddOn;
import com.example.demo.entity.BasePlan;
import com.example.demo.entity.Cart;
import com.example.demo.repository.CartRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public List<Cart> getCart(String userEmail) {
        return cartRepository.findByUserEmail(userEmail);
    }

    public void addBasePlan(String userEmail, BasePlan basePlan) {
        Cart cartItem = Cart.builder()
                .userEmail(userEmail)
                .basePlan(basePlan)
                .addOn(null)
                .build();
        cartRepository.save(cartItem);
    }

    public void addAddon(String userEmail, AddOn addon) {
        Cart cartItem = Cart.builder()
                .userEmail(userEmail)
                .basePlan(null)
                .addOn(addon)
                .build();
        cartRepository.save(cartItem);
    }

    public void removeBasePlan(String userEmail, Long basePlanId) {
        cartRepository.findByUserEmail(userEmail)
            .stream()
            .filter(c -> c.getBasePlan() != null && c.getBasePlan().getId().equals(basePlanId))
            .forEach(c -> cartRepository.deleteById(c.getId()));
    }

    public void removeAddon(String userEmail, Long addonId) {
        cartRepository.findByUserEmail(userEmail)
            .stream()
            .filter(c -> c.getAddOn() != null && c.getAddOn().getId().equals(addonId))
            .forEach(c -> cartRepository.deleteById(c.getId()));
    }

    @Transactional
    public void clearCart(String userEmail) {
        cartRepository.deleteByUserEmail(userEmail);
    }
}
