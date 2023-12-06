package com.example.backend.repository;

import com.example.backend.entity.StudentTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentTaskRepository extends JpaRepository<StudentTask, Long> {
}
