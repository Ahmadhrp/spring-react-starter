package com.harahap.ibrahim.repository;

import com.harahap.ibrahim.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by Aim MSI on 4/13/2017.
 */
public interface projectRepository  extends CrudRepository<Project, Integer> {
    List<Project> findByName(@Param("name") String name);
}
