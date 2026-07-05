package com.buywise.buywise_ai.model;

public class ProductRequest {

    private String url;

    public ProductRequest() {
    }

    public ProductRequest(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}