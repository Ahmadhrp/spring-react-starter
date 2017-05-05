package com.harahap.ibrahim.service;

import com.harahap.ibrahim.domain.Programmer;
import com.harahap.ibrahim.repository.userRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Created by Aim MSI on 5/5/2017.
 */

@Service
public class ProgrammerDetailService implements UserDetailsService{

    private static final Logger LOGGER = LoggerFactory.getLogger(ProgrammerDetailService.class);

    @Autowired
    private userRepository userRepo;

    @Override
    public ProgrammerPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("In Programmer detail");
        try {
            Programmer programmer = userRepo.findByUsername(username);
            System.out.println("programmer = "+ programmer);
            if (programmer == null) {
                LOGGER.debug("user not found with the provided username");
                return null;
            }
            LOGGER.debug(" user from username " + programmer.toString());
            return new ProgrammerPrincipal(programmer);
        }
        catch (Exception e){
            throw new UsernameNotFoundException("User not found");
        }
    }


}
