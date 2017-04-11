/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.harahap.ibrahim.controller;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.harahap.ibrahim.domain.Users;
import com.harahap.ibrahim.repository.userRepositoryFindByUsernameImpl;
import com.harahap.ibrahim.repository.userRepositoryPaging;
import java.util.Collection;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Aim MSI
 */
@Controller
public class homeController {

    @Autowired
    private userRepositoryPaging userRepo;

    private String jsonUser;

    @Autowired
    private userRepositoryFindByUsernameImpl userRepoFindLoggedInUser;


    @RequestMapping("/")
    public String home(Model model, HttpServletRequest request) {
        //System.out.println(userRepo.findAll());       
        //userRepo.save(user);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) auth.getAuthorities();

//        UserDetails user = (UserDetails) auth.getPrincipal();
//        Users logged_in_user = userRepoFindLoggedInUser.findByUsername(user.getUsername());
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


