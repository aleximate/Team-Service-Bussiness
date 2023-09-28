package com.example.tsbbackend.Controller;

import com.example.tsbbackend.Dto.ProductDto;
import com.example.tsbbackend.Dto.SaveProductDto;
import com.example.tsbbackend.Model.Product;
import com.example.tsbbackend.Model.TypeProduct;
import com.example.tsbbackend.Repository.ProductRepository;
import com.example.tsbbackend.Repository.TypeProductRepository;
import com.example.tsbbackend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private TypeProductRepository typeProductRepository;

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAll() {
        List<ProductDto> products = productService.getProduct();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    @GetMapping(path = "/onsale")
    public ResponseEntity<List<SaveProductDto>>getOnSale(){
        List<SaveProductDto>saveProductDtos=productService.getOnSaleProduct();
        return new ResponseEntity<>(saveProductDtos,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> save(@RequestBody SaveProductDto product)  {

        try {
            Product createdProduct = productService.createProduct(product);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Manejo de excepción para datos de entrada no válidos
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Integer id, @RequestBody SaveProductDto saveProductDto) {
        boolean updated = productService.updateProduct(id, saveProductDto);

        if (updated) {
            return new ResponseEntity<>("Producto actualizado correctamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se encontró el producto con ID: " + id, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        boolean deleted = productService.deleteProductById(id);

        if (deleted) {
            return new ResponseEntity<>("Producto eliminado correctamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se encontró el producto con ID: " + id, HttpStatus.NOT_FOUND);
        }
    }
}

