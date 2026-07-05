package com.buywise.buywise_ai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    public String analyzeReviews(String reviews) {

        RestTemplate restTemplate = new RestTemplate();

        String url = "https://api.groq.com/openai/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        String prompt = """
You are BuyWise AI.

Analyze the customer reviews below.

Return ONLY valid JSON.

Do not use markdown.
Do not use ```json.
Do not explain anything.

Return this exact JSON:

{
  "productName": "",
  "buyScore": 90,
  "summary": "",
  "pros": [
    "",
    "",
    ""
  ],
  "cons": [
    "",
    ""
  ],
  "verdict": "",
  "bestFor": [
    "",
    ""
  ],
  "avoidIf": [
    "",
    ""
  ],
  "confidence": 95,
  "fakeReviewRisk": "Low",
  "positive": 80,
  "neutral": 12,
  "negative": 8,
  "priceVerdict": "",
  "buyingTips": [
    "",
    ""
  ]
}

Rules:
- buyScore must be between 0 and 100.
- confidence must be between 70 and 100.
- positive + neutral + negative = 100.
- summary should contain 2-3 short sentences.
- pros should contain 3-5 points.
- cons should contain 2-4 points.
- bestFor should contain exactly 2 points.
- avoidIf should contain exactly 2 points.
- buyingTips should contain exactly 2 short tips.

Customer Reviews:

""" + reviews;

        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "llama-3.3-70b-versatile");
        body.put("messages", List.of(message));
        body.put("temperature", 0.2);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(url, request, String.class);

        return response.getBody();
    }
}