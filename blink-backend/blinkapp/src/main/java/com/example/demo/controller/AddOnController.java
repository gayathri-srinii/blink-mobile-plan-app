package com.example.demo.controller;

import com.example.demo.entity.AddOn;
import com.example.demo.service.AddOnService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addons")
@CrossOrigin("*")
public class AddOnController {

    private final AddOnService addOnService;

    public AddOnController(AddOnService addOnService) {
        this.addOnService = addOnService;
    }

    @PostMapping("/add")
    public AddOn addAddOn(@RequestBody AddOn addOn) {
        return addOnService.addAddOn(addOn);
    }

    @GetMapping("/all")
    public List<AddOn> getAllAddOns() {
        return addOnService.getAllAddOns();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAddOn(@PathVariable Long id) {
        addOnService.deleteAddOn(id);
        return "Add-On deleted successfully!";
    }
}
