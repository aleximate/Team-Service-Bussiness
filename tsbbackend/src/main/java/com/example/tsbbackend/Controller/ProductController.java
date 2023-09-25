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

        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
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

