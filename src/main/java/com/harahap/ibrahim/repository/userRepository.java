/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.harahap.ibrahim.repository;

import com.harahap.ibrahim.domain.Programmer;
import org.springframework.data.repository.CrudRepository;


/**
 *
 * @author Aim MSI
 */
public interface userRepository extends CrudRepository<Programmer,Integer> {

}
