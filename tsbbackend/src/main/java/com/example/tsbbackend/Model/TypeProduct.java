package com.example.tsbbackend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
public class TypeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "typeProduct")
    private List<Product> products = new ArrayList<>();

}
