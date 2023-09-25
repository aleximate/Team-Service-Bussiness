package com.example.tsbbackend.Service;

import com.example.tsbbackend.Dto.ProductDto;
import com.example.tsbbackend.Dto.SaveProductDto;
import com.example.tsbbackend.Model.Product;
import com.example.tsbbackend.Repository.ProductRepository;
import com.example.tsbbackend.Repository.TypeProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private TypeProductRepository typeProductRepository;


    public List<ProductDto> getProduct(){
        return productRepository.findProduct();
    }

    public List<SaveProductDto> getOnSaleProduct(){
        return productRepository.productOnSale();
    }
    public Product createProduct(Product product){
        product.setName(product.getName());
        product.setPrice(product.getPrice());
        product.setOnSale(product.getOnSale());
        product.setTypeProduct(product.getTypeProduct());

        productRepository.save(product);
        return product;

    }

    public boolean updateProduct(Integer id, SaveProductDto saveProductDto) {
        Optional<Product> productOptional = productRepository.findById(id);

        if (productOptional.isPresent()) {
            Product existingProduct = productOptional.get();

            // Actualiza los campos del producto con los valores de updatedProductDto
            existingProduct.setName(saveProductDto.getName());
            existingProduct.setPrice(saveProductDto.getPrice());
            existingProduct.setOnSale(saveProductDto.isOnSale());
            existingProduct.setTypeProduct(typeProductRepository.findById
                    (saveProductDto.getTypeProduct()).orElseThrow(()->new RuntimeException("Tipo de producto no encontrado")));

            // Guarda el producto actualizado
            productRepository.save(existingProduct);

            return true; // Producto actualizado con éxito
        } else {
            return false; // Producto no encontrado
        }
    }

    public boolean deleteProductById(Integer id) {
        Optional<Product> productOptional = productRepository.findById(id);

        if (productOptional.isPresent()) {
            productRepository.deleteById(id);
            return true; // Producto eliminado con éxito
        } else {
            return false; // Producto no encontrado
        }
    }
}
