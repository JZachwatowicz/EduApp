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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getPrincipal().toString();
        if (userService.isAdmin(currentPrincipalName)) {
            task.setCourse(courseService.getOneCourse(courseId));
            taskService.save(task);
            return new ResponseEntity<>("Dodano zadanie", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("User is not admin", HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/task")
    public ResponseEntity<Task> getOneTask(@RequestParam Long id) {
        return new ResponseEntity<>(taskService.findTaskById(id), HttpStatus.OK);
    }

    @PutMapping("/tasks")
    public ResponseEntity<String> editTaskPOST(@RequestBody @Valid Task task, @RequestParam Long courseId, BindingResult binding) {
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getPrincipal().toString();
        if (userService.isAdmin(currentPrincipalName)) {
            Task db_task = taskService.findTaskById(task.getId());

            db_task.setId(task.getId());
            db_task.setCourse(courseService.getOneCourse(courseId));
            db_task.setQuestion(task.getQuestion());
            db_task.setRight_answer(task.getRight_answer());
            db_task.setWrong_answers(task.getWrong_answers());
            db_task.setTitle(task.getTitle());
            db_task.setDone(task.getDone());
            db_task.setContent(task.getContent());

            taskService.save(db_task);
            return new ResponseEntity<>("Edytowano zadanie", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("User is not admin", HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("task")
    public ResponseEntity<String> deleteTask(@RequestParam Long id) {
        if(taskService.findTaskById(id) == null) {
            return new ResponseEntity<>("Nie ma zadania o takim id", HttpStatus.BAD_REQUEST);
        }

        taskService.deleteById(id);
        return new ResponseEntity<>("Usunięto zadanie", HttpStatus.OK);
    }

}
