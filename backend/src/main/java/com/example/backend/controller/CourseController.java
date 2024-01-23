package com.example.backend.controller;

import com.example.backend.dtos.CourseDto;
import com.example.backend.entity.Course;
import com.example.backend.entity.Task;
import com.example.backend.services.CourseServiceImpl;
import com.example.backend.services.SubjectServiceImpl;
import com.example.backend.services.TaskServiceImpl;
import com.example.backend.services.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CourseController {
    @Autowired
    private CourseServiceImpl courseService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private TaskServiceImpl taskService;

    @Autowired
    private SubjectServiceImpl subjectService;

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
    public ResponseEntity<?> addCoursePOST(@RequestBody @Valid Course course, @RequestParam Long subject_id, BindingResult binding) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getPrincipal().toString();
        if (userService.isAdmin(currentPrincipalName)){
            if (courseService.existByName(course.getName())) {
                binding.rejectValue("name", "", "Nazwa kursu jest juz zajeta");
                return new ResponseEntity<>("Nazwa kursu jest juz zajeta", HttpStatus.FORBIDDEN);
            }

        if (binding.hasErrors()) {
            String errors = "";
            for (ObjectError error : binding.getAllErrors()) { // 1.
                String fieldErrors = ((FieldError) error).getField(); // 2.
                errors = errors.concat(binding.getFieldError(fieldErrors).getDefaultMessage());
                errors = errors.concat("\n");
            }
            return new ResponseEntity<>(errors, HttpStatus.FORBIDDEN);
        }

        course.setSubject(subjectService.findSubjectById(subject_id));
        System.out.println(course.getName() + " - " + course.getSubject().getName());
        courseService.save(course);
        return new ResponseEntity<>(course.getId(), HttpStatus.OK);
    }
        else {
            return new ResponseEntity<>("User is not admin", HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/courses")
    public ResponseEntity<?> editCoursePOST(@RequestBody @Valid Course course, @RequestParam Long subject_id, BindingResult binding) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getPrincipal().toString();
        if (userService.isAdmin(currentPrincipalName)){
            /*if (courseService.existByName(course.getName())) {
                binding.rejectValue("name", "", "Nazwa kursu jest juz zajeta");
                return new ResponseEntity<>("Nazwa kursu jest juz zajeta", HttpStatus.FORBIDDEN);
            }*/

            if (binding.hasErrors()) {
                String errors = "";
                for (ObjectError error : binding.getAllErrors()) { // 1.
                    String fieldErrors = ((FieldError) error).getField(); // 2.
                    errors = errors.concat(binding.getFieldError(fieldErrors).getDefaultMessage());
                    errors = errors.concat("\n");
                }
                return new ResponseEntity<>(errors, HttpStatus.FORBIDDEN);
            }

            Course db_course = courseService.getOneCourse(course.getId());

            db_course.setSubject(subjectService.findSubjectById(subject_id));
            db_course.setName(course.getName());
            db_course.setDescription(course.getDescription());

            courseService.save(db_course);
            return new ResponseEntity<>(course.getId(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("User is not admin", HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("courses")
    public ResponseEntity<String> deleteCourse(@RequestParam Long id) {
        List<Task> tasks = taskService.findTasksByCourse_Id(id);
        for(Task task : tasks){
            taskService.deleteById(task.getId());
        }
        courseService.deleteById(id);
        return new ResponseEntity<>("Usunięto kurs i wszystkie towarzyszące mu zadania", HttpStatus.OK);
    }
}
