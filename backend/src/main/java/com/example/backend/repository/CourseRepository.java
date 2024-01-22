package com.example.backend.repository;

import com.example.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
//    @Query("select new com.example.backend.dtos.CourseDto(c.id, c.name, c.description, "+
//            "c.subject.name) from Course c")
//    List<CourseDto> getAllCourses();
    List<Course> findByOrderByNameAsc();

    Course findCourseById(Long id);

    List<Course> findByName(String name);

    boolean existsByName(String name);

}
