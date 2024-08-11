package com.wissal.serverside.Controllers;

import com.wissal.serverside.Entities.Product;
import com.wissal.serverside.Entities.ProductHistory;
import com.wissal.serverside.Entities.ProductHistoryDTO;
import com.wissal.serverside.Entities.User;
import com.wissal.serverside.Repositories.ProductHistoryRepository;
import com.wissal.serverside.Repositories.UserRepository;
import com.wissal.serverside.Services.IProductService;
import com.wissal.serverside.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/product")
public class ProductController {

    private final IProductService iProductService;
    private final UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductHistoryRepository productHistoryRepository;

    @GetMapping
    public List<Product> getAll(){
        return iProductService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product get(@PathVariable int id){
        return iProductService.getProductById(id);
    }

    @PostMapping("/addProduct")
    public Product addProduct(@RequestParam("name") String name,
                              @RequestParam("description") String description,
                              @RequestParam("image") MultipartFile image,
                              @RequestParam("quantity") Integer quantity,
                              @RequestParam("price") double price) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setImage(image.getBytes());
        product.setQuantity(quantity);
        product.setPrice(price);

        product.setUser(currentUser);

        Product savedProduct = iProductService.addProduct(product);

        ProductHistory history = ProductHistory.builder()
                .product(savedProduct)
                .user(currentUser)
                .state("Entrant")
                .timestamp(LocalDateTime.now())
                .build();

        productHistoryRepository.save(history);
        //iProductService.addProduct(product);
        //return product;

        return savedProduct;

    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        iProductService.deleteProduct(id);
    }

    @PutMapping("/updateProduct")
    public Product updateProduct(
            @RequestParam("id") Integer id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("price") double price) throws IOException {

        Product product = iProductService.getProductById(id);
        if (product != null) {
            product.setName(name);
            product.setDescription(description);
            if (image != null && !image.isEmpty()) {
                product.setImage(image.getBytes());
            }
            product.setQuantity(quantity);
            product.setPrice(price);

            iProductService.UpdateProduct(product);
        }
        return product;
    }

    //for home screen
    @GetMapping("/getNewestProduct")
    public List<Product> getProductByCategory(){
        return iProductService.getTop4Product();
    }

    @GetMapping("productCount")
    public long getProductsCount(){
        return this.iProductService.productCount();
    }

   /* @GetMapping("/history")
    public List<ProductHistory> getProductHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return productHistoryRepository.findByUserId(currentUser.getId());
    } */

    @GetMapping("/history")
    public List<ProductHistoryDTO> getProductHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<ProductHistory> historyList = productHistoryRepository.findByUserId(currentUser.getId());

        return historyList.stream()
                .map(history -> new ProductHistoryDTO(
                        history.getProduct().getIdProduct(),
                        history.getProduct().getName(),
                        history.getProduct().getDescription(),
                        history.getProduct().getQuantity(),
                        history.getUser().getUsername(),
                        history.getState()
                ))
                .collect(Collectors.toList());
    }

    @PatchMapping("/changeState")
    public ProductHistoryDTO changeState(@RequestParam("productId") Integer productId,
                                         @RequestParam("state") String state) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();

        // Find the most recent history record for the given product
        ProductHistory productHistory = productHistoryRepository.findFirstByProductIdOrderByTimestampDesc(productId)
                .orElseThrow(() -> new RuntimeException("Product history not found"));

        // Verify that the current user is the owner of the product history record
        if (!productHistory.getUser().getEmail().equals(currentUserEmail)) {
            throw new RuntimeException("You are not authorized to change the state of this product");
        }

        // Update the state
        productHistory.setState(state);
        productHistoryRepository.save(productHistory);

        // Create and return the DTO
        return new ProductHistoryDTO(
                productHistory.getProduct().getIdProduct(),
                productHistory.getProduct().getName(),
                productHistory.getProduct().getDescription(),
                productHistory.getProduct().getQuantity(),
                productHistory.getUser().getUsername(),
                productHistory.getState()
                );


    }

}
