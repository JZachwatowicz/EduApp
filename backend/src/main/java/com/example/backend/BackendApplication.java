package com.example.backend;

import com.example.backend.entity.Course;
import com.example.backend.entity.Subject;
import com.example.backend.entity.Task;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.SubjectRepository;
import com.example.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//TODO:
// 1. Customowy error page
// 2. Do endpointów dodać exception gdzie trzeba
@SpringBootApplication
public class BackendApplication {

    private SubjectRepository subjectRepository;
    private CourseRepository courseRepository;
    private TaskRepository taskRepository;

    public BackendApplication(SubjectRepository subjectRepository, CourseRepository courseRepository, TaskRepository taskRepository) {
        this.subjectRepository = subjectRepository;
        this.courseRepository = courseRepository;
        this.taskRepository = taskRepository;
        var przyroda = new Subject(1L, "Przyroda");
        var matematyka = new Subject(2L, "Matematyka");
        var polski = new Subject(3L, "Polski");
        this.subjectRepository.save(przyroda);
        this.subjectRepository.save(matematyka);
        this.subjectRepository.save(polski);
        var zjawiska_pogodowe = new Course(1L, "Zjawiska pogodowe", "Nauka zjawisk pogodowych", przyroda);
        var pisownia_o_u = new Course(2L, "Pisownia u i ó", "Nauka pisowni u i ó", polski);
        var ulamki = new Course(3L, "Ułamki", "Nauka ułamków", matematyka);
        this.courseRepository.save(zjawiska_pogodowe);
        this.courseRepository.save(pisownia_o_u);
        this.courseRepository.save(ulamki);
        var list = new ArrayList<Task>(Arrays.asList(
                new Task(1L, "Pogoda #1", "Kontent pogoda#1", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(1L, "Pogoda #1", "Kontent pogoda#1", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(2L, "Pogoda #2", "Kontent pogoda#2", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(3L, "Pogoda #3", "Kontent pogoda#3", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(4L, "Pogoda #4", "Kontent pogoda#4", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(5L, "Pogoda #5", "Kontent pogoda#5", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(6L, "Pisownia u #1", "Kontent pisownia u#1", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(7L, "Pisownia u #2", "Kontent pisownia u#2", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(8L, "Pisownia ó #3", "Kontent pisownia ó#3", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(9L, "Ułamki #1", "Ułamki u#1", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(10L, "Ułamki #2", "Ułamki #2", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe),
                new Task(11L, "Ułamki #4", "Ułamki #4", "Pytanie", "Odpowiedz poprawna", "Odpowiedz niepoprawna", false, zjawiska_pogodowe)
        ));
        for (var task: list) {
            this.taskRepository.save(task);
        }

    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
