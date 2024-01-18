package com.example.backend.services;

import com.example.backend.entity.User;

import java.util.List;

public interface UserService {
    public User findByLogin(String login);

    public List<User> findAll();

    void save(User user);

    boolean existsById(long i);

    boolean existsByLogin(String login);

    public User findByEmail(String email);

    public void deleteByLogin(String login);
}
