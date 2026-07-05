package com.buywise.buywise_ai.controller;

import com.buywise.buywise_ai.model.ProductRequest;
import com.buywise.buywise_ai.service.ProductExtractorService;
import com.buywise.buywise_ai.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @Autowired
    private ProductExtractorService productExtractorService;

    @PostMapping("/analyze")
    public String analyze(@RequestBody ProductRequest request) {

        // URL received from frontend
        String url = request.getUrl();

        // Extract product name
        String productName = productExtractorService.extractProductName(url);

        // Search + AI Analysis
        return searchService.analyzeProduct(productName);
    }
}