package com.harahap.ibrahim.repository;

import com.harahap.ibrahim.domain.Project;
import com.harahap.ibrahim.domain.projectProjection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


/**
 * Created by Aim MSI on 4/13/2017.
 */
@RepositoryRestResource(excerptProjection = projectProjection.class)
public interface projectRepository extends CrudRepository<Project, Integer> {
    //List<Project> findByName(@Param("name") String name);
}
