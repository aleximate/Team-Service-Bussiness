package com.example.tsbbackend.Dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Integer id;
    private String name;
    private Float price;
    private boolean onSale;
    private TypeProductDto typeProduct;
}
