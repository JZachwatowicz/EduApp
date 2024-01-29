package com.example.backend.controller;

import com.example.backend.configuration.JwtTokenUtil;
import com.example.backend.entity.User;
import com.example.backend.services.UserService;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtUtil;

    @ResponseBody
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid User LogReq, BindingResult binding )  {

        try {
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(LogReq.getLogin(), LogReq.getPassword()));
            return new ResponseEntity<>(jwtUtil.createToken(LogReq),HttpStatus.OK);

        }catch (BadCredentialsException e){
            return new ResponseEntity<>("Niepoprawne dane logowania", HttpStatus.FORBIDDEN);
        }catch (Exception e){
            return new ResponseEntity<>("Logowanie nie powiodło się", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerPagePOST(@RequestBody @Valid User user, BindingResult binding) {

        if (userService.findByLogin(user.getLogin()) != null) {
            binding.rejectValue("login", "", "Login jest już zajęty");
            return new ResponseEntity<>("Login jest już zajęty", HttpStatus.FORBIDDEN);
        }

        if (userService.findByEmail(user.getEmail()) != null) {
            binding.rejectValue("login", "", "Konto z podanym email'em już istnieje");
            return new ResponseEntity<>("Konto z podanym email'em już istnieje", HttpStatus.FORBIDDEN);
        }

        if (binding.hasErrors()) {
            String errors = "";
            for (ObjectError error : binding.getAllErrors()) { // 1.
                String fieldErrors = ((FieldError) error).getField(); // 2.
                errors = errors.concat(binding.getFieldError(fieldErrors).getDefaultMessage());
                errors =  errors.concat("\n");
            }
            return new ResponseEntity<>(errors, HttpStatus.FORBIDDEN);
        }
        user.setRole("USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);
        return new ResponseEntity<>("Zarejestrowano", HttpStatus.OK);
    }

    @GetMapping("/user")
    public User profile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getPrincipal().toString();
        User user = userService.findByLogin(currentPrincipalName);
        user.setPassword(" ");
        return user;
    }

    @PutMapping("/user")
    public ResponseEntity<String> editUser(@RequestBody @Valid   User user, BindingResult binding){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getPrincipal().toString();
        if(userService.existsByLogin(currentPrincipalName)){
        User currentUser = userService.findByLogin(currentPrincipalName);
        user.setLogin(currentUser.getLogin());
        user.setId(currentUser.getId());
        //user.setRole("USER");
        if(user.getEmail().length() > 0){
            if (userService.findByEmail(user.getEmail()) != null) {
                return new ResponseEntity<>("Konto z podanym email'em już istnieje", HttpStatus.FORBIDDEN);
            }
            if (binding.hasFieldErrors("email")) {
                return new ResponseEntity<>(binding.getFieldError("email").getDefaultMessage(), HttpStatus.FORBIDDEN);
            }

        }
        else {
            user.setEmail(currentUser.getEmail());
        }
            if(user.getPassword().length() > 0){
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                if (binding.hasFieldErrors("password")) {
                    return new ResponseEntity<>(binding.getFieldError("password").getDefaultMessage(), HttpStatus.FORBIDDEN);
                }
            }
            else
                user.setPassword(currentUser.getPassword());

            userService.save(user);
            return new ResponseEntity<>( "Zmieniono dane użytkownika", HttpStatus.OK) ;
        }
        return  new ResponseEntity<>( "Nie udało się zmienić danych użytkownika ponieważ użytkownik nie istnieje", HttpStatus.BAD_REQUEST);
    }
    @Transactional
    @DeleteMapping("/user")
    public ResponseEntity<String> deleteUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getPrincipal().toString();
        if(userService.existsByLogin(currentPrincipalName)){
            userService.deleteByLogin(currentPrincipalName);
            return new ResponseEntity<>("Usunięto użytkownika", HttpStatus.OK);
        }
        return new ResponseEntity<>("Nie udało się usunąć użytkownika ponieważ użytkownik nie istnieje", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/userIsAdmin")
    public Boolean isAdmin(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getPrincipal().toString();
        return userService.isAdmin(currentPrincipalName);
    }
}
