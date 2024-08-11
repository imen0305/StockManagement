package com.wissal.serverside.Entities;

public class ProductHistoryDTO {
    private Integer idProduct;
    private String name;
    private String description;
    private Integer quantity;
    private String username;
    private String state;

    public ProductHistoryDTO(Integer idProduct, String name, String description, Integer quantity, String username, String state) {
        this.idProduct = idProduct;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.username = username;
        this.state = state;
    }

    // Getters and setters
    public Integer getIdProduct() {
        return idProduct;
    }

    public void setId(Integer idProduct) {
        this.idProduct = idProduct;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
