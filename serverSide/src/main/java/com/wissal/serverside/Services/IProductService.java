package com.wissal.serverside.Services;

import com.wissal.serverside.Entities.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAllProducts();

    Product getProductById(int id);

    Product addProduct(Product product);

    void UpdateProduct(Product product);

    void deleteProduct(int id);

    // for home screen
    List<Product> getTop4Product();
    long productCount();
}
