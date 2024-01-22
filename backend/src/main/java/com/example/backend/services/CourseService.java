package com.example.backend.services;

import com.example.backend.dtos.CourseDto;
import com.example.backend.entity.Course;

import java.util.List;

public interface CourseService {
    public List<CourseDto> getAllCourses();

    public List<CourseDto> getCourseById(Long id);

    public List<CourseDto> getCourseByName(String name);
    boolean existByName(String name);

    public Boolean courseExists(Long id);

    List<CourseDto> getAllCoursesSorted();

    void save(Course course);

    ;
}
