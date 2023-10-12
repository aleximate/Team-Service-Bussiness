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
            ORDER BY p.id DESC
            """
    )
    public List<ProductDto> findProduct();

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
            WHERE p.onSale = true
            ORDER BY p.id DESC
            """
    )
    public List<ProductDto>productOnSale();


    @Query(value = """
    SELECT new com.example.tsbbackend.Dto.ProductDto(
    p.id,
    p.name,
    p.price,
    p.image,
    p.onSale,
    NEW com.example.tsbbackend.Dto.TypeProductDto(tp.id, tp.name)
    )
    FROM Product p
    INNER JOIN p.typeProduct tp
    WHERE tp.id = :typeProductId
    ORDER BY p.id DESC
    """
    )
    public List<ProductDto> findProductsByTypeProductId(@Param("typeProductId") Integer typeProductId);


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
        ORDER BY p.id DESC
        """
    )
    public List<ProductDto> findProductById(@Param("productId") Integer productId);

}
