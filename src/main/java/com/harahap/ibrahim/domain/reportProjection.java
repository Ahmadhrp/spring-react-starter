package com.harahap.ibrahim.domain;

import com.harahap.ibrahim.domain.Project;
import com.harahap.ibrahim.domain.Report;
import org.springframework.data.rest.core.config.Projection;
import java.util.Date;

/**
 * Created by Bensolo on 4/15/2017.
 */

@Projection(name = "projectName", types = {Report.class})
public interface reportProjection {

    Long getId();

    String getUraian();

    Date getTanggal();

    Project getProject();

    Status getStatus();

}