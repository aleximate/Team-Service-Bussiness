package com.example.tsbbackend.Controller;

import com.example.tsbbackend.Model.Consumer;
import com.example.tsbbackend.Repository.ConsumerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @PostMapping
    public ResponseEntity<Consumer>save(@RequestBody Consumer consumer){
        Consumer consumer1= consumerRepository.save(consumer);
        return new ResponseEntity<>(consumer1,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>deleteConsumer(@PathVariable Integer id) {
        consumerRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
