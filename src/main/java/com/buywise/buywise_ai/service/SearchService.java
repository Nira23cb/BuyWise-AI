package com.buywise.buywise_ai.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class SearchService {

    @Autowired
    private GroqService groqService;

    @Value("${tavily.api.key}")
    private String apiKey;

    // Existing method (optional)
    public String searchReviews(String productName) {

        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.tavily.com/search";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();

        body.put("api_key", apiKey);
        body.put("query", productName + " reviews pros cons reddit");
        body.put("search_depth", "basic");
        body.put("max_results", 5);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(url, request, String.class);

        return response.getBody();
    }

    // New method
    public String analyzeProduct(String productName) {

        String tavilyReviews = searchReviews(productName);

        return groqService.analyzeReviews(tavilyReviews);

    }

}