package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String login;

    @Column(nullable=false, unique=true)
    private String email;

    @Column(nullable=false)
    private String password;

    /*@OneToMany(mappedBy = "students_tasks")
    private List<StudentTask> tasks;*/
}
