package com.example.tsbbackend.Controller;

import com.example.tsbbackend.Model.TypeProduct;
import com.example.tsbbackend.Repository.TypeProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/type")
public class TypeProductController {

    @Autowired
    private TypeProductRepository typeProductRepository;

    @GetMapping
    public ResponseEntity<List<TypeProduct>>getAll(){
        List<TypeProduct> typeProducts= typeProductRepository.findAll();
        return ResponseEntity.ok(typeProducts);
    }
    @PostMapping
    public ResponseEntity<TypeProduct>save(@RequestBody TypeProduct product){
        TypeProduct product1= typeProductRepository.save(product);
        return ResponseEntity.ok(product1);
    }


}
