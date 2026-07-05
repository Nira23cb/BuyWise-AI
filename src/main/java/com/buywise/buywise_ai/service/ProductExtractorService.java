package com.buywise.buywise_ai.service;

import org.springframework.stereotype.Service;

@Service
public class ProductExtractorService {

    public String extractProductName(String url) {

        try {

            // Remove query parameters
            url = url.split("\\?")[0];

            // Get last part of URL
            String[] parts = url.split("/");

            String product = parts[parts.length - 1];

            // Replace hyphens with spaces
            product = product.replace("-", " ");

            // Remove extra characters
            product = product.replaceAll("[^a-zA-Z0-9 ]", "");

            return product;

        } catch (Exception e) {

            return url;

        }

    }

}