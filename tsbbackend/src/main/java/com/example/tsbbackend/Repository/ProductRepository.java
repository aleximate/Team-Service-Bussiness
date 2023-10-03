package com.example.tsbbackend.Repository;

import com.example.tsbbackend.Dto.ProductDto;
import com.example.tsbbackend.Dto.SaveProductDto;
import com.example.tsbbackend.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {

    @Query(value = """
            SELECT NEW com.example.tsbbackend.Dto.ProductDto(
            p.id,
            p.name,
            p.price,
            p.image,
            p.onSale,
            NEW com.example.tsbbackend.Dto.TypeProductDto
            (
            tp.id,
            tp.name)
            )
            FROM Product p
            INNER JOIN p.typeProduct tp
            """
    )
    public List<ProductDto> findProduct();

    @Query(value = """
            SELECT NEW com.example.tsbbackend.Dto.SaveProductDto(
                p.name,
                p.price,
                p.onSale,
                tp.id
            )
            FROM Product p
            INNER JOIN p.typeProduct tp
            WHERE p.onSale = true
            """
    )
    public List<SaveProductDto>productOnSale();



    @Query(value = """
        SELECT new com.example.tsbbackend.Dto.ProductDto(
        p.id,
        p.name,
        p.price,
        p.image,
        p.onSale,
        NEW com.example.tsbbackend.Dto.TypeProductDto
        (
        tp.id,
        tp.name)
        )
        FROM Product p
        INNER JOIN p.typeProduct tp
        WHERE p.id = :productId
        """
    )
    public List<ProductDto> findProductById(@Param("productId") Integer productId);

}
