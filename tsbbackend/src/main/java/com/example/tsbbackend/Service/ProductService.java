package com.example.tsbbackend.Service;

import com.example.tsbbackend.Dto.ProductDto;
import com.example.tsbbackend.Dto.SaveProductDto;
import com.example.tsbbackend.Model.Product;
import com.example.tsbbackend.Model.TypeProduct;
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
    public Product createProduct(SaveProductDto product){

        TypeProduct typeProduct = typeProductRepository.findById(product.getTypeProduct())
                .orElseThrow(() -> new RuntimeException("Tipo de producto no encontrado"));

        // Crear un nuevo producto
        Product product1 = new Product();
        product1.setName(product.getName());
        product1.setPrice(product.getPrice());
        product1.setOnSale(product.isOnSale());
        product1.setTypeProduct(typeProduct);

        // Guardar el producto en la base de datos
        Product savedProduct = productRepository.save(product1);

        return savedProduct;
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
