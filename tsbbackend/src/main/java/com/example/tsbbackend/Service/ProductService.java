package com.example.tsbbackend.Service;

import com.example.tsbbackend.Dto.ProductDto;
import com.example.tsbbackend.Dto.SaveProductDto;
import com.example.tsbbackend.Model.Product;
import com.example.tsbbackend.Model.TypeProduct;
import com.example.tsbbackend.Repository.ProductRepository;
import com.example.tsbbackend.Repository.TypeProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
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

    public List<ProductDto> getOnSaleProduct(){
        return productRepository.productOnSale();
    }

    public List<ProductDto> getProductByType(Integer id){
        return productRepository.findProductsByTypeProductId(id);
    }

    public List<ProductDto>getProductById(Integer id){
        return productRepository.findProductById(id);
    }
    public Product createProduct(SaveProductDto productDto,  MultipartFile image) throws IOException {

        byte[] imageData = image.getBytes();

            // Crear una instancia de Product y configurar sus propiedades
            TypeProduct typeProduct = typeProductRepository.findById(productDto.getTypeProduct())
                    .orElseThrow(() -> new RuntimeException("Tipo de producto no encontrado"));

            Product product = new Product();
            product.setName(productDto.getName());
            product.setPrice(productDto.getPrice());
            product.setImage(imageData);
            product.setOnSale(productDto.isOnSale());
            product.setTypeProduct(typeProduct);

            // Guardar el producto en la base de datos
            Product savedProduct = productRepository.save(product);

            return savedProduct;
    }


    public Product updateProduct(Integer productId, SaveProductDto productDto, MultipartFile image) throws IOException {
        try {
            // Verificar si el producto existe
            Optional<Product> existingProductOptional = productRepository.findById(productId);

            if (existingProductOptional.isPresent()) {
                Product existingProduct = existingProductOptional.get();

                // Actualizar las propiedades del producto con los nuevos valores proporcionados
                byte[] imageData = image.getBytes();

                TypeProduct typeProduct = typeProductRepository.findById(productDto.getTypeProduct())
                        .orElseThrow(() -> new RuntimeException("Tipo de producto no encontrado"));

                existingProduct.setName(productDto.getName());
                existingProduct.setPrice(productDto.getPrice());
                existingProduct.setImage(imageData);
                existingProduct.setOnSale(productDto.isOnSale());
                existingProduct.setTypeProduct(typeProduct);

                // Guardar el producto actualizado en la base de datos
                Product updatedProduct = productRepository.save(existingProduct);

                return updatedProduct;
            } else {
                throw new RuntimeException("Producto no encontrado");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar el producto", e);
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
