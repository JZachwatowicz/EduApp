package com.example.backend.services;

import com.example.backend.dtos.CourseDto;
import com.example.backend.entity.Course;
import com.example.backend.mappers.CourseMapper;
import com.example.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CourseServiceImpl implements CourseService{
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseMapper courseMapper;
    @Override
    public List<CourseDto> getAllCourses() {
        return (List<CourseDto>) courseRepository.findAll().stream()
                .map(courseMapper::mapCourseToCourseDto).collect(Collectors.toList());
    }

    public List<CourseDto> getCourseById(Long id){
        return (List<CourseDto>) courseRepository.findById(id)
                .stream()
                .map(courseMapper::mapCourseToCourseDto).collect(Collectors.toList());
    }

    @Override
    public List<CourseDto> getCourseByName(String name) {
        return (List<CourseDto>) courseRepository.findByName(name)
                .stream()
                .map(courseMapper::mapCourseToCourseDto).collect(Collectors.toList());
    }

    @Override
    public boolean existByName(String name) {
        return courseRepository.existsByName(name);
    }

    @Override
    public Boolean courseExists(Long id) {
        return courseRepository.existsById(id);
    }

    @Override
    public List<CourseDto> getAllCoursesSorted() {
        return (List<CourseDto>)courseRepository.findByOrderByNameAsc().stream()
                .map(courseMapper::mapCourseToCourseDto).collect(Collectors.toList());
    }

    @Override
    public void save(Course course) {
        courseRepository.save(course);
    }

}
