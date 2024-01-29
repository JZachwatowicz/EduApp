package com.example.backend.controller;

import com.example.backend.entity.Subject;
import com.example.backend.services.SubjectServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class SubjectController {
    @Autowired
    private SubjectServiceImpl subjectService;

    @GetMapping("/subjects")
    public List<Subject> getAllCourses() {
        return subjectService.getAllSubjects();
    }
}
