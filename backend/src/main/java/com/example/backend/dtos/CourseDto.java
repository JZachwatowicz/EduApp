package com.example.backend.dtos;

import com.example.backend.entity.Task;
import jakarta.persistence.Column;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseDto {
    private Long id;
    private String name;
    private String description;
    private String subjectName;
    private Set<Task> tasks;
}
