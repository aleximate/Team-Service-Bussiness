package com.example.tsbbackend.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Consumer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String lastName;
    private String email;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date birthDate;
    private String dni;
}
