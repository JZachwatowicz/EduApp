package com.example.backend.controller;

import com.example.backend.dtos.CourseDto;
import com.example.backend.entity.Course;
import com.example.backend.services.CourseServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/courses")
    public ResponseEntity<String> registerPagePOST(@RequestBody @Valid Course course, BindingResult binding) {
       /* if (courseService.getCourseByName(course.getName()) != null) {
            binding.rejectValue("name", "", "Nazwa kursu jest juz zajeta");
            return new ResponseEntity<>("Nazwa kursu jest juz zajeta", HttpStatus.FORBIDDEN);
        }

        if (binding.hasErrors()) {
            String errors = "";
            for (ObjectError error : binding.getAllErrors()) { // 1.
                String fieldErrors = ((FieldError) error).getField(); // 2.
                errors = errors.concat(binding.getFieldError(fieldErrors).getDefaultMessage());
                errors =  errors.concat("\n");
            }
            return new ResponseEntity<>(errors, HttpStatus.FORBIDDEN);
        }*/

        System.out.println(course);
        courseService.save(course);
        return new ResponseEntity<>("Dodano kurs", HttpStatus.OK);
    }
}
