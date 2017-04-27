package com.harahap.ibrahim.domain;

import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

/**
 * Created by Bensolo on 4/15/2017.
 */
@Projection(name = "projectStatus", types = {Project.class})
public interface projectProjection {

    Integer getId();

    String getName();

    String getFoto();

    String getPic();

    Date getStart_date();

    Date getTarget_date();

    Status getStatus();

}