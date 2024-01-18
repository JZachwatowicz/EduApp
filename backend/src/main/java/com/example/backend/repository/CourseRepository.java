package com.example.backend.repository;

import com.example.backend.dtos.CourseDto;
import com.example.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
//    @Query("select new com.example.backend.dtos.CourseDto(c.id, c.name, c.description, "+
//            "c.subject.name) from Course c")
//    List<CourseDto> getAllCourses();
    List<Course> findByOrderByNameAsc();
}
