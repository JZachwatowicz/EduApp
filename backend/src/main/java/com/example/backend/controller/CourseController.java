package com.example.backend.controller;

import com.example.backend.dtos.CourseDto;
import com.example.backend.entity.Course;
import com.example.backend.repository.CourseRepository;
import com.example.backend.services.CourseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class CourseController {
    @Autowired
    private CourseServiceImpl courseService;

    @GetMapping("/courses")
    public List<CourseDto> getAllCourses() { return courseService.getAllCourses();}
    @GetMapping("/coursesSorted")
    public List<CourseDto> getAllCoursesSorted() { return courseService.getAllCoursesSorted();}
    @GetMapping("/courseById")
    public ResponseEntity<?> getCourseById(@RequestParam Long id) {
        if(courseService.courseExists(id)){
            return new ResponseEntity<List<CourseDto>>(courseService.getCourseById(id), HttpStatus.OK);
        } else
            return new ResponseEntity<String>("Kurs o podanym id nie istnieje", HttpStatus.BAD_REQUEST);

    }
}
