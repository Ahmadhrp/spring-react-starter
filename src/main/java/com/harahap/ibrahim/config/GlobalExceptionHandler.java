package com.harahap.ibrahim.config;

import com.harahap.ibrahim.domain.Errors;
import org.apache.tomcat.util.http.fileupload.FileUploadBase;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Bensolo on 4/26/2017.
 */
@RestController
@ControllerAdvice
public class GlobalExceptionHandler
{
    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<?> handleBaseException(MultipartException e){
        System.out.println("Eksepsi ditangkap "+e.getMessage());
        System.out.println("Objek Eksepsi"+e.getRootCause());
        List<Errors> list = new ArrayList<>();
        if(e.getRootCause() instanceof FileUploadBase.FileSizeLimitExceededException)
        {
            list.add(new Errors("foto","File Tidak Boleh Lebih Dari 3 Mega Bous"));
            System.out.println("File Size Limit Ex");
            return new ResponseEntity<List>(list, HttpStatus.BAD_REQUEST);
        }
        else if(e.getRootCause() instanceof MaxUploadSizeExceededException)
        {
            list.add(new Errors("foto","File Upload Tidak Boleh Lebih Dari 3 Mega Bous"));
            System.out.println("Max Upload Exceed");
            return new ResponseEntity<List>(list, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(e.getRootCause().toString(), HttpStatus.BAD_REQUEST);
    }

}
