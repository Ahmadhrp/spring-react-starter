package com.harahap.ibrahim.controller;

import com.harahap.ibrahim.domain.Errors;
import com.harahap.ibrahim.domain.Project;
import com.harahap.ibrahim.repository.projectRepository;
import com.sun.istack.internal.Nullable;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.Validator;
import javax.validation.constraints.NotNull;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by Aim MSI on 4/25/2017.
 */

//@RepositoryRestController
@RestController
public class CustomProjectRestController {


    @Autowired
    private projectRepository projectRepo;

    @Autowired
    private Validator validator;

    private static final String ROOT_PATH = System.getProperty("user.dir");

    private static final String UPLOAD_PATH = ROOT_PATH
            + File.separator + "src"
            + File.separator + "main"
            + File.separator + "resources"
            + File.separator + "static"
            + File.separator + "upload";

    private static final String HOSTNAME = "localhost";

    private static final String LOCATION = "http://" + HOSTNAME + ":8080/upload/";

    //@Valid @NotNull @NotBlank

    @RequestMapping(method = POST, value = "/file", consumes = {"multipart/form-data"})
    public ResponseEntity<?> addProject(@RequestPart("project") Resource<Project> resource,
                                        @RequestPart(value = "file", required = false) MultipartFile file) {

        //System.out.println("Sempat masuk ke method");
        String Logo ,filepath ,filename;
        File newfile;
        List<Errors> list = new ArrayList<Errors>();
        Project project = resource.getContent();

        //VALIDASI
        if (!validator.validate(project).isEmpty()) {
            Set<ConstraintViolation<Project>> errors = validator.validate(project);
            for (ConstraintViolation<Project> error : errors) {
                list.add(new Errors(error.getPropertyPath().toString(), error.getMessage()));
            }
            if (file != null) {
                System.out.println("File Tidak Null");
                filename = file.getOriginalFilename();
                System.out.println("Original Filename = " + filename);
                System.out.println("Rootpath = " + ROOT_PATH);
                filepath = Paths.get(UPLOAD_PATH, filename).toString();
                newfile = new File(filepath);
                if (newfile.exists()) {
                    list.add(new Errors("foto", "Jangan Upload File Yang Sama Bous"));
                    return new ResponseEntity<List>(list, HttpStatus.BAD_REQUEST);
                }
            }
            return new ResponseEntity<List>(list, HttpStatus.BAD_REQUEST);
        }
        System.out.println("Sudah Selesai Validasi");

        //SIMPAN
        if(file != null){
            try {
                // Save the file locally
                filename = file.getOriginalFilename();
                filepath = Paths.get(UPLOAD_PATH, filename).toString();
                newfile = new File(filepath);
                Logo = LOCATION+filename;
                System.out.println("Simpan File dan Project");
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(newfile));
                stream.write(file.getBytes());
                stream.close();
            } catch (Exception e) {
                System.out.println("eksepsi " + e.getMessage());
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<String>("Sukses Simpan File dan Project", HttpStatus.OK);
        }
        else{
            Logo = LOCATION+"default.jpg";
            System.out.println("Simpan Project");
            return new ResponseEntity<String>("Sukses Simpan Project", HttpStatus.OK);
        }

    }
}
