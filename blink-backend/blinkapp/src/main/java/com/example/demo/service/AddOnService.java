package com.example.demo.service;

import com.example.demo.entity.AddOn;
import com.example.demo.repository.AddOnRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AddOnService {

    private final AddOnRepository addOnRepository;

    public AddOnService(AddOnRepository addOnRepository) {
        this.addOnRepository = addOnRepository;
    }

    public AddOn addAddOn(AddOn addOn) {
        return addOnRepository.save(addOn);
    }

    public List<AddOn> getAllAddOns() {
        return addOnRepository.findAll();
    }

    public AddOn getAddOnById(Long id) {
        return addOnRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Add-On not found with id: " + id));
    }
    
    public void deleteAddOn(Long id) {
        addOnRepository.deleteById(id);
    }
}
