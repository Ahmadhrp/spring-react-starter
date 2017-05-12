/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.harahap.ibrahim.controller;

import com.harahap.ibrahim.domain.Programmer;
import com.harahap.ibrahim.repository.userRepository;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Aim MSI
 */
@Controller
public class userController 
{
    @Autowired
    private userRepository userRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String addUser()
    {
        return "login/adduser";
    }
    
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String postUser(HttpServletRequest request)
    {
        //BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Programmer programmer = new Programmer();
        programmer.setNama(request.getParameter("nama"));
        programmer.setCreatedAt(new Date());
        programmer.setCreatedby(request.getParameter("nama"));
        programmer.setUser_role("USER");
        programmer.setActive(Boolean.TRUE);
        programmer.setUsername(request.getParameter("username"));
        programmer.setPassword(passwordEncoder.encode(request.getParameter("password")));
        programmer.setPosisi(request.getParameter("posisi"));
        
        userRepo.save(programmer);
        return "redirect:login";
    }
}
