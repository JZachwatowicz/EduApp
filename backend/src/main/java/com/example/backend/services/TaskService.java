package com.example.backend.services;

import com.example.backend.entity.Task;

import java.util.List;

public interface TaskService {
    public List<Task> findTasksByCourse_Id(Long id);

    public Task findTaskById(Long Id);

    void setDone(Long id);

    public void save(Task task);
}

