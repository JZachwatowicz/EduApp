package com.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable=false, unique=true)
    @NotBlank(message = "Pole nie może być puste")
    private String login;

    @Column(nullable=false, unique=true)
    @NotBlank(message = "Pole nie może być puste")
    @Email(message = "Email niepoprawny", regexp = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}")
    @Size(min = 6, message = "Email musi mieć conajmniej {min} znaków")
    private String email;

    @Column(nullable=false)
    @Size(min = 3, message = "Hasło musi mieć conajmniej {min} znaki")
    private String password;
}
