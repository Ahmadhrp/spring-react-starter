/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.harahap.ibrahim.controller;

import com.harahap.ibrahim.repository.userRepository;
import java.util.Collection;
import javax.servlet.http.HttpServletRequest;

import com.harahap.ibrahim.service.ProgrammerDetailService;
import com.harahap.ibrahim.service.ProgrammerPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Aim MSI
 */
@Controller
public class homeController {

    @Autowired
    private userRepository userRepo;

    @Autowired
    private ProgrammerDetailService programmerDetailService;

    private String jsonUser;

    @RequestMapping("/")
    public String home(Model model, HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Homecontroller");
        UserDetails user = (UserDetails) auth.getPrincipal();
        System.out.println("Logged In username = "+user.getUsername());
        ProgrammerPrincipal programmerPrincipal =  programmerDetailService.loadUserByUsername(user.getUsername());
        System.out.println("Class principal = "+ programmerPrincipal.getProgrammer());

        Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) auth.getAuthorities();

//        UserDetails user = (UserDetails) auth.getPrincipal();
//        Programmer logged_in_user = userRepoFindLoggedInUser.findByUsername(user.getUsername());
//        ObjectMapper mapper = new ObjectMapper();
//
//        try {
//            // convert user object to json string and return it
//            jsonUser = mapper.writeValueAsString(logged_in_user);
//        }
//        // catch various errors
//        catch (JsonGenerationException e) {
//            e.printStackTrace();
//        }
//        catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        System.out.println(jsonUser);

        if (isRolePresent(authorities, "USER")) {
            //model.addAttribute("active", jsonUser);
            return "user/index";
        } else {
            //System.out.println("Admin");
            model.addAttribute("users", userRepo.findAll());
            return "admin/home";
        }

    }

    private boolean isRolePresent(Collection<GrantedAuthority> authorities, String role) {
        boolean isRolePresent = false;
        for (GrantedAuthority grantedAuthority : authorities) {
            isRolePresent = grantedAuthority.getAuthority().equals(role);
            if (isRolePresent) {
                break;
            }
        }
        return isRolePresent;
    }
}


