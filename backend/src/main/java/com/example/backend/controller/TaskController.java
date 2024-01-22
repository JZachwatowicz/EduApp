package com.example.backend.controller;

import com.example.backend.entity.StudentTask;
import com.example.backend.entity.Task;
import com.example.backend.services.CourseServiceImpl;
import com.example.backend.services.StudentTaskServiceImpl;
import com.example.backend.services.TaskServiceImpl;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskServiceImpl taskService;
    @Autowired
    private UserService userService;
    @Autowired
    private StudentTaskServiceImpl studentTaskService;
    @Autowired
    private CourseServiceImpl courseService;

    @GetMapping("/tasksByCourse")
    public ResponseEntity<List<Task>> getTasksByCourse(@RequestParam Long id) {
        if(courseService.courseExists(id)){
            return new ResponseEntity<>(taskService.findTasksByCourse_Id(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/setDone")
    public void setDone(@RequestParam Long id){
        taskService.setDone(id);
    }

    @CrossOrigin
    @GetMapping("/userTasks")
    public ResponseEntity<List<StudentTask>> getTasksByUserId(@RequestParam Long id) {
        if(userService.existsById(Integer.parseInt(String.valueOf(id)))){
            return new ResponseEntity<>(studentTaskService.findByUser_Id(id), HttpStatus.OK );
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/tasks")
    public ResponseEntity<String> addTaskPOST(@RequestBody @Valid Task task, @RequestParam Long courseId, BindingResult binding) {
        /*if (courseService.courseExists(courseId)) {
            binding.rejectValue("name", "", "Nie ma takiego kursu");
            return new ResponseEntity<>("Nie ma takiego kursu", HttpStatus.FORBIDDEN);
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

        task.setCourse(courseService.getOneCourse(courseId));
        taskService.save(task);
        return new ResponseEntity<>("Dodano kurs", HttpStatus.OK);
    }

}
