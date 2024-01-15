package com.example.backend.services;

import com.example.backend.entity.StudentTask;
import com.example.backend.repository.StudentTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StudentTaskServiceImpl implements StudenTaskService{
    @Autowired
    private StudentTaskRepository studentTaskRepository;
    @Override
    public List<StudentTask> findByUser_Id(Long id) {
        return studentTaskRepository.findByUser_Id(id);
    }
}
