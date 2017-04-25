package com.harahap.ibrahim.controller;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.harahap.ibrahim.domain.Pdf;
import com.harahap.ibrahim.domain.Report;
import com.harahap.ibrahim.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by Bensolo on 4/11/2017.
 */
@RestController
public class pdfController
{
    @Autowired
    private EntityManager em;

    @Autowired
    private userRepository userRepo;

    @RequestMapping(value = "/pdf", method = RequestMethod.POST)
    public String report(@Validated @RequestBody Pdf pdf){

        Authentication authentication
                = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            return null;
        }

        String listreport = "";
        List report = em.createQuery(
                "from Report where id_programmer = :id and year(tanggal) = :year and month(tanggal) = :month order by tanggal asc", Report.class
        ).setParameter("id",pdf.getId())
                .setParameter("month", pdf.getMonth()).setParameter("year",pdf.getYear())
                .getResultList();
        ObjectMapper mapper = new ObjectMapper();

        try {
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
