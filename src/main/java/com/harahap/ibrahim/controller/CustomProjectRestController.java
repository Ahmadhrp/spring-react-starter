package com.harahap.ibrahim.controller;

import com.harahap.ibrahim.domain.Project;
import com.harahap.ibrahim.repository.projectRepository;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by Aim MSI on 4/25/2017.
 */

//@RepositoryRestController
@RestController
public class CustomProjectRestController {

    @Autowired
    private projectRepository projectRepo;

    @RequestMapping(method = POST, value = "/file",  consumes = {"multipart/form-data"})
    public void addProject(@RequestPart("project") @Valid Resource<Project> project,
                           @RequestPart("file") @Valid @NotNull @NotBlank MultipartFile file) {
            System.out.println(project);
    }

//    @RequestMapping(value = "/executesampleservice", method = RequestMethod.POST,
//            consumes = {"multipart/form-data"})
//    @ResponseBody
//    public boolean executeSampleService(@RequestPart("properties") @Valid ConnectionProperties properties,
//            @RequestPart("file") @Valid @NotNull @NotBlank MultipartFile file) {
//        return projectService.executeSampleService(project, file);
//    }


}
