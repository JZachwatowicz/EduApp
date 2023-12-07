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

    @Column(nullable=false)
    @NotBlank(message = "Pole nie może być puste")
    @Email
    private String email;

    @Column(nullable=false)
    @Size(min = 3, message = "Wpisz co najmniej {min} znaki")
    private String password;
}
