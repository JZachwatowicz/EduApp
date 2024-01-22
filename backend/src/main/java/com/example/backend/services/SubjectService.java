package com.example.backend.services;

import com.example.backend.entity.Subject;

import java.util.List;

public interface SubjectService {

    public Subject findSubjectById(Long id);
    public List<Subject> getAllSubjects();
}
