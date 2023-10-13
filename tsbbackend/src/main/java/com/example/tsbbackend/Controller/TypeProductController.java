package com.example.tsbbackend.Controller;

import com.example.tsbbackend.Model.TypeProduct;
import com.example.tsbbackend.Repository.TypeProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    @GetMapping("/{id}")
    public ResponseEntity<Optional<TypeProduct>>findTypeById(@PathVariable("id") Integer id){
        Optional<TypeProduct>typeProduct=typeProductRepository.findById(id);
        return ResponseEntity.ok(typeProduct);
    }
    @PostMapping
    public ResponseEntity<TypeProduct>save(@RequestParam ("name") String name){
        try {
            TypeProduct typeProduct=new TypeProduct();
            typeProduct.setName(name);
            TypeProduct product=typeProductRepository.save(typeProduct);
            return new ResponseEntity<>(typeProduct,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<TypeProduct> update(@PathVariable Integer id, @RequestBody TypeProduct updatedTypeProductData) {
        try {
            Optional<TypeProduct> existingTypeProductOptional = typeProductRepository.findById(id);

            if (existingTypeProductOptional.isPresent()) {
                TypeProduct existingTypeProduct = existingTypeProductOptional.get();

                // Actualiza los campos del objeto existente con los datos enviados en updatedTypeProductData
                existingTypeProduct.setName(updatedTypeProductData.getName());

                TypeProduct updatedTypeProduct = typeProductRepository.save(existingTypeProduct);

                return new ResponseEntity<>(updatedTypeProduct, HttpStatus.OK);
            } else {
                // Si no se encuentra la entidad con el ID proporcionado, puedes devolver un ResponseEntity con el código 404 (Not Found).
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Si ocurre un error durante la actualización, puedes devolver un ResponseEntity con el código 500 (Internal Server Error).
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void>deleteType(@PathVariable Integer id){
        typeProductRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
