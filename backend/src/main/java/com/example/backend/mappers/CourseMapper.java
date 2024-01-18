package com.example.backend.mappers;

import com.example.backend.dtos.CourseDto;
import com.example.backend.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface CourseMapper {
    @Mapping(target = "subjectName", source = "subject.name")
    CourseDto mapCourseToCourseDto(Course student);
}