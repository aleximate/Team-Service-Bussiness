package com.example.tsbbackend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveProductDto {
    private String name;
    private Float price;
    private MultipartFile image;
    private boolean onSale;
    private Integer typeProduct;

}
