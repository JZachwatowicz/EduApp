package com.example.backend.controller;

import com.example.backend.dao.UserDao;
import com.example.backend.entity.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserDao dao;

    @GetMapping("/login")
    public String loginPage() {
        return "login?";
    }

    @GetMapping("/register")
    public String registerPage(Model m) {
        m.addAttribute("user", new User());
        return "register GetMapping";
    }

    @PostMapping("/register")
    public String registerPagePOST(@RequestBody @Valid User user, BindingResult binding) {
        if (dao.findByLogin(user.getLogin()) != null) {
            binding.rejectValue("login", "", "Login jest już zajęty");
            return "login zajęty";
        }

        if (binding.hasErrors()) {
            return "register has errors";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        dao.save(user);
        return "register success";
    }

    @GetMapping("/profile")
    public String profilePage(Model m, Principal principal) {
        m.addAttribute("user", dao.findByLogin(principal.getName()));
        return "profile";
    }

    @GetMapping("/users")
    public String usersPage(Model m) {
        m.addAttribute("userList", dao.findAll());
        return "users";
    }

    @GetMapping("/account/delete")
    public String deleteAccount() {
        return "deleteuser";
    }

    @PostMapping("/account/delete")
    public String deleteAccountPOST(Principal principal) {
        dao.delete(dao.findByLogin(principal.getName()));
        return "redirect:/logout";
    }

    @GetMapping("/profile/edit")
    public String editProfile(Model m, Principal principal) {
        User user = dao.findByLogin(principal.getName());
        m.addAttribute(user);
        return "edituser";
    }

    @PostMapping("/profile/edit")
    public String editProfilePOST(@Valid User form, BindingResult binding, Principal principal) {
        if (!form.getLogin().equals(principal.getName()) && dao.findByLogin(form.getLogin()) != null) {
            binding.rejectValue("login", "", "Login jest już zajęty");
        }

        if (binding.hasErrors()) {
            return "edituser";
        }
        User user = dao.findByLogin(principal.getName());
        boolean logout = !user.getLogin().equals(form.getLogin());
        user.setLogin(form.getLogin());
        user.setEmail(form.getEmail());
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        dao.save(user);
        return logout ? "redirect:/logout" : "profile";
    }
}
