package com.harahap.ibrahim.controller;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.harahap.ibrahim.domain.Programmer;
import com.harahap.ibrahim.domain.Report;
import com.harahap.ibrahim.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Bensolo on 4/11/2017.
 */
@RestController
public class pdfController
{
    @Autowired
    private EntityManager em;

    private String listreport;

    @Autowired
    private userRepository userRepo;

    @RequestMapping(value = "/pdf", method = RequestMethod.POST)
    public String report(@RequestBody Programmer programmer){

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            return null;
        }

        //UserDetails user =  (UserDetails) authentication.getPrincipal();

        System.out.println(programmer);

        List report = em.createQuery(
                "from Report where id_programmer = :id order by tanggal asc", Report.class
        ).setParameter("id",programmer.getId()).getResultList();

         // return "test";
        ObjectMapper mapper = new ObjectMapper();

        try {
            // convert user object to json string and return it
            listreport = mapper.writeValueAsString(report);
        }
        // catch various errors
        catch (JsonGenerationException e) {
            e.printStackTrace();
        }
        catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return listreport;
    }
}
