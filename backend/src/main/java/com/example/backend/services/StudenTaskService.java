package com.example.backend.services;

import com.example.backend.entity.StudentTask;

import java.util.List;

public interface StudenTaskService {
    List<StudentTask> findByUser_Id(Long id);
}
