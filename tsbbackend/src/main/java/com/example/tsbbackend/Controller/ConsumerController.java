package com.example.tsbbackend.Controller;

import com.example.tsbbackend.Dto.ProductDto;
import com.example.tsbbackend.Model.Consumer;
import com.example.tsbbackend.Repository.ConsumerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/consumer")
public class ConsumerController {
    @Autowired
    private ConsumerRepository consumerRepository;

    @GetMapping
    public ResponseEntity<List<Consumer>>findAll(){
        List<Consumer> consumers=consumerRepository.findAll();
        return new ResponseEntity<>(consumers, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Consumer>>findConsumerById(@PathVariable("id") Integer id){
        Optional<Consumer>consumers=consumerRepository.findById(id);
        return ResponseEntity.ok(consumers);
    }
    @PostMapping
    public ResponseEntity<Consumer> saveConsumer(
            @RequestParam("name") String name,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("birthDate") Date birthDate,
            @RequestParam("dni") String dni){
        try {
            Consumer consumer = new Consumer();
            consumer.setName(name);
            consumer.setLastName(lastName);
            consumer.setEmail(email);
            consumer.setBirthDate(birthDate);
            consumer.setDni(dni);
            Consumer savedConsumer = consumerRepository.save(consumer);
            return new ResponseEntity<>(savedConsumer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Consumer> updateConsumer(
            @PathVariable Integer id,
            @RequestParam("name") String name,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("birthDate") Date birthDate,
            @RequestParam("dni") String dni) {
        try {
            Optional<Consumer> existingConsumerOptional = consumerRepository.findById(id);

            if (existingConsumerOptional.isPresent()) {
                Consumer existingConsumer = existingConsumerOptional.get();
                existingConsumer.setName(name);
                existingConsumer.setLastName(lastName);
                existingConsumer.setEmail(email);
                existingConsumer.setBirthDate(birthDate);
                existingConsumer.setDni(dni);

                Consumer updatedConsumer = consumerRepository.save(existingConsumer);
                return new ResponseEntity<>(updatedConsumer, HttpStatus.OK);
            } else {
                // Si no se encuentra el consumidor con el ID proporcionado, puedes devolver un ResponseEntity con el código 404 (Not Found).
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Si ocurre un error durante la actualización, puedes devolver un ResponseEntity con el código 500 (Internal Server Error).
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void>deleteConsumer(@PathVariable Integer id) {
        consumerRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
