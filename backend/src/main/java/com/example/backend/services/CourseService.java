package com.example.backend.services;

import com.example.backend.dtos.CourseDto;
import com.example.backend.entity.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {
    public List<CourseDto> getAllCourses();

    public List<CourseDto> getCourseById(Long id);

    public Boolean courseExists(Long id);

    List<CourseDto> getAllCoursesSorted();
}
