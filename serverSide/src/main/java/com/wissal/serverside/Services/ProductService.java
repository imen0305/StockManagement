package com.wissal.serverside.Services;

import com.wissal.serverside.Entities.Product;
import com.wissal.serverside.Repositories.ProductRepository;
import com.wissal.serverside.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService{
    private final ProductRepository productRepository;
    private final UserRepository repository;


    public ProductService(ProductRepository productRepository, UserRepository repository) {
        this.productRepository = productRepository;
        this.repository = repository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Product addProduct(Product product) {
        productRepository.saveAndFlush(product);

        return product;
    }
    @Override
    @Transactional
    public void UpdateProduct(Product product) {
        productRepository.saveAndFlush(product);

    }

    @Override
    public void deleteProduct(int id) {
        productRepository.deleteById(id);

    }

    // for home screen
    @Override
    public List<Product> getTop4Product(){
        return this.productRepository.findTop4ByOrderByIdProductDesc();
    }
    @Override
    public long productCount(){
        return  this.productRepository.count();
    }
}
