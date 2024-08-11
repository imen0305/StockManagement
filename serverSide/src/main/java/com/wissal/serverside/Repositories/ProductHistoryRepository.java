package com.wissal.serverside.Repositories;

import com.wissal.serverside.Entities.ProductHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductHistoryRepository extends JpaRepository<ProductHistory, Integer> {
    List<ProductHistory> findByUserId(Integer userId);

    @Query("SELECT ph FROM ProductHistory ph WHERE ph.product.idProduct = :productId ORDER BY ph.timestamp DESC")
    Optional<ProductHistory> findFirstByProductIdOrderByTimestampDesc(@Param("productId") Integer productId);

}
