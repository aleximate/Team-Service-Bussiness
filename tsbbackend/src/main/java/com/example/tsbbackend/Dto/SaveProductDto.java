package com.example.tsbbackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveProductDto {
    private String name;
    private Float price;
    private boolean onSale;
    private Integer typeProduct;

}
