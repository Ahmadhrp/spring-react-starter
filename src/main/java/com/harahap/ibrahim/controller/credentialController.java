package com.harahap.ibrahim.controller;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.harahap.ibrahim.domain.Programmer;
import com.harahap.ibrahim.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;

/**
 * Created by Bensolo on 4/11/2017.
 */
@RestController
public class credentialController
{
    @Autowired
    private EntityManager em;

    @Autowired
    private userRepository userRepo;

    @RequestMapping(value = "/creden", method = RequestMethod.GET)
    public Programmer creden(){

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            return null;
        }

        UserDetails user =  (UserDetails) authentication.getPrincipal();
        //UserDetails user = (UserDetails) auth.getPrincipal();
        Programmer logged_in_programmer = em.createQuery(
                "from Programmer where username = :username", Programmer.class
        ).setParameter("username",user.getUsername()).getSingleResult();
        // ObjectMapper mapper = new ObjectMapper();

        return logged_in_programmer;
//        ObjectMapper mapper = new ObjectMapper();
//
//        try {
//            // convert user object to json string and return it
//            authJson = mapper.writeValueAsString(logged_in_programmer);
//        }
//        // catch various errors
//        catch (JsonGenerationException e) {
//            e.printStackTrace();
//        }
//        catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        return authJson;
    }
}
