package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByLogin(String login);
    User findByEmail(String email);

    void deleteByLogin(String login);
    Boolean existsByLogin(String login);
}
