package com.example.backend.services;

import com.example.backend.entity.Task;
import com.example.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private TaskRepository taskRepository;
    @Override
    public List<Task> findTasksByCourse_Id(Long id) {
       return taskRepository.findTasksByCourse_Id(id);
    }

    @Override
    public Task findTaskById(Long id) {
        return taskRepository.findTasksById(id);
    }

    @Override
    public void setDone(Long id) {
        if(taskRepository.existsById(id)){
            Task task =  taskRepository.findTasksById(id);
            task.setDone(true);
            taskRepository.save(task);
        }


    }

    @Override
    public void save(Task task) {
        taskRepository.save(task);
    }

    @Override
    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }
}
