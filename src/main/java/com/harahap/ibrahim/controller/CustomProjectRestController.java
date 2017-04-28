package com.harahap.ibrahim.controller;

import com.harahap.ibrahim.domain.Errors;
import com.harahap.ibrahim.domain.Project;
import com.harahap.ibrahim.repository.projectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * Created by Aim MSI on 4/25/2017.
 */

@SuppressWarnings("Duplicates")
@RepositoryRestController
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


    @RequestMapping(method = POST, value = "/projects", consumes = {"multipart/form-data"})
    public ResponseEntity<?> addProject(@RequestPart("project") Resource<Project> resource,
                                        @RequestPart(value = "file", required = false) MultipartFile file) {

        String Logo, filepath, filename;
        File newfile;
        List<Errors> list = new ArrayList<>();
        Project project = resource.getContent();

        if (file != null) {
            System.out.println( file.getContentType().contains("image"));
        }

        //VALIDASI
        if (!validator.validate(project).isEmpty()) {
            Set<ConstraintViolation<Project>> errors = validator.validate(project);
            for (ConstraintViolation<Project> error : errors) {
                list.add(new Errors(error.getPropertyPath().toString(), error.getMessage()));
            }
            if (file != null) {
                System.out.println("File Tidak Null");
                if(!file.getContentType().contains("image")){
                    list.add(new Errors("foto", "File Yang Didukung Hanya Image Bous"));
                    return new ResponseEntity<List>(list, HttpStatus.BAD_REQUEST);
                }
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
        Project newproject = new Project();
        newproject.setName(project.getName());
        newproject.setPic(project.getPic());
        newproject.setStatus(project.getStatus());
        newproject.setStart_date(project.getStart_date());
        newproject.setTarget_date(project.getTarget_date());
        newproject.setCreatedAt(project.getCreatedAt());
        newproject.setCreatedby(project.getCreatedby());
        if (file != null) {
            try {
                // Save the file locally
                filename = file.getOriginalFilename();
                filepath = Paths.get(UPLOAD_PATH, filename).toString();
                newfile = new File(filepath);
                System.out.println("Simpan File dan Project");
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(newfile));
                stream.write(file.getBytes());
                stream.close();

            } catch (Exception e) {
                System.out.println("eksepsi " + e.getMessage());
                return new ResponseEntity<String>("Terjadi Kesalahan Dalam Upload File, Dicoba Lagi Bous !!!", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            Logo = filename;
            try {
                newproject.setFoto(Logo);
                projectRepo.save(newproject);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                e.printStackTrace();
                return new ResponseEntity<>("Terjadi Kesalahan Dalam Proses Menyimpan , Dicoba Lagi Bous !!!", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return new ResponseEntity<>("Sukses Simpan File dan Project", HttpStatus.OK);
        } else {

            Logo = "default.png";

            try {
                newproject.setFoto(Logo);
                projectRepo.save(newproject);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                e.printStackTrace();
                return new ResponseEntity<>("Terjadi Kesalahan Dalam Proses Menyimpan , Dicoba Lagi Bous !!!", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            System.out.println("Simpan Project");
            return new ResponseEntity<>("Sukses Simpan Project", HttpStatus.OK);
        }

    }

    @RequestMapping(method = DELETE, value = "/projects/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Integer id) {

        System.out.println("Masuk Ke Method Delete");

        //SIMPAN
        try {
            projectRepo.delete(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>("Terjadi Kesalahan Dalam Proses Delete !!!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Sukses Delete Project", HttpStatus.OK);
    }

    @RequestMapping(method = PATCH, value = "/projects/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateProject(@PathVariable Integer id,
                                           @RequestPart("project") Resource<Project> resource,
                                           @RequestPart(value = "file", required = false) MultipartFile file) {

        System.out.println("Masuk Ke Method Patch");
        String Logo, filepath, filename;
        File newfile;
        List<Errors> list = new ArrayList<>();
        Project project = resource.getContent();

        //VALIDASI
        if (!validator.validate(project).isEmpty()) {
            Set<ConstraintViolation<Project>> errors = validator.validate(project);
            for (ConstraintViolation<Project> error : errors) {
                list.add(new Errors(error.getPropertyPath().toString(), error.getMessage()));
            }
            if (file != null) {
                System.out.println("File Tidak Null");
                if(!file.getContentType().contains("image")){
                    list.add(new Errors("foto", "File Yang Didukung Hanya Image Bous"));
                    return new ResponseEntity<List>(list, HttpStatus.BAD_REQUEST);
                }
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

        Project newproject = projectRepo.findOne(id);
        newproject.setName(project.getName());
        newproject.setPic(project.getPic());
        newproject.setStatus(project.getStatus());
        newproject.setStart_date(project.getStart_date());
        newproject.setTarget_date(project.getTarget_date());
        newproject.setUpdatedAt(project.getUpdatedAt());
        newproject.setUpdatedBy(project.getUpdatedBy());

        if (file != null) {
            try {
                // Save the file locally
                filename = file.getOriginalFilename();
                filepath = Paths.get(UPLOAD_PATH, filename).toString();
                newfile = new File(filepath);
                System.out.println("Update File dan Project");
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(newfile));
                stream.write(file.getBytes());
                stream.close();

            } catch (Exception e) {
                System.out.println("eksepsi " + e.getMessage());
                return new ResponseEntity<String>("Terjadi Kesalahan Dalam Upload File, Dicoba Lagi Bous !!!", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            Logo = filename;
            try {
                newproject.setFoto(Logo);
                projectRepo.save(newproject);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                e.printStackTrace();
                return new ResponseEntity<>("Terjadi Kesalahan Dalam Proses Update , Dicoba Lagi Bous !!!", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return new ResponseEntity<>("Sukses Update File dan Project", HttpStatus.OK);
        } else {
            try {
                projectRepo.save(newproject);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                e.printStackTrace();
                return new ResponseEntity<>("Terjadi Kesalahan Dalam Proses Update , Dicoba Lagi Bous !!!", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            System.out.println("Update Project");
            return new ResponseEntity<>("Sukses Update Project", HttpStatus.OK);
        }

    }
}
