package com.wissal.serverside.Repositories;

import com.wissal.serverside.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findTop4ByOrderByIdProductDesc();

    long count();
}
