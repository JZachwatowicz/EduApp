package com.example.backend.repository;

import com.example.backend.entity.StudentTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentTaskRepository extends JpaRepository<StudentTask, Long> {
    List<StudentTask> findByUser_Id(Long id);
}
