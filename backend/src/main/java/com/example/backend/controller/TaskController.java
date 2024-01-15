package com.example.backend.controller;

import com.example.backend.entity.StudentTask;
import com.example.backend.entity.Task;
import com.example.backend.services.CourseServiceImpl;
import com.example.backend.services.StudentTaskServiceImpl;
import com.example.backend.services.TaskServiceImpl;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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

}
