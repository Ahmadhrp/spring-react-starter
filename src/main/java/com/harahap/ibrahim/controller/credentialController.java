package com.harahap.ibrahim.controller;

import com.harahap.ibrahim.domain.Users;
import com.harahap.ibrahim.repository.userRepositoryFindByUsernameImpl;
import com.harahap.ibrahim.repository.userRepositoryPaging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Bensolo on 4/11/2017.
 */
@RestController
public class credentialController
{
    @Autowired
    private userRepositoryPaging userRepo;

    @Autowired
    private userRepositoryFindByUsernameImpl userRepoFindLoggedInUser;

    @RequestMapping(value = "/creden", method = RequestMethod.GET)
    public Users creden(){

        UserDetails user =  (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //UserDetails user = (UserDetails) auth.getPrincipal();
        Users logged_in_user = userRepoFindLoggedInUser.findByUsername(user.getUsername());
        // ObjectMapper mapper = new ObjectMapper();
        return logged_in_user;
    }
}
