package com.example.tsbbackend.Dto;

import jakarta.persistence.Lob;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Integer id;
    private String name;
    private Float price;
    private byte[] image;
    private boolean onSale;
    private TypeProductDto typeProduct;
}
