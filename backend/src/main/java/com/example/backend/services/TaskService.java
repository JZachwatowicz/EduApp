package com.example.backend.services;

import com.example.backend.dtos.CourseDto;
import com.example.backend.entity.Course;
import com.example.backend.entity.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    public List<Task> findTasksByCourse_Id(Long id);

    public Task findTaskById(Long Id);

    void setDone(Long id);
}

