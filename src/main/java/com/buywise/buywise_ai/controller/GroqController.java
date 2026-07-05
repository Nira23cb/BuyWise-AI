package com.buywise.buywise_ai.controller;

import com.buywise.buywise_ai.service.GroqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/groq")
@CrossOrigin("*")
public class GroqController {

    @Autowired
    private GroqService groqService;

    @GetMapping("/test")
    public String test() {

        String reviews = """
Excellent battery life.
Amazing camera.
Phone heats during gaming.
Price is expensive.
""";

        return groqService.analyzeReviews(reviews);
    }
}