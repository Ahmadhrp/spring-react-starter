package com.harahap.ibrahim.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

/**
 * Created by Aim MSI on 4/13/2017.
 */
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Data
@Entity
public class Project {
    private
    @Id
    @GeneratedValue
    Integer Id;

    @ManyToOne
    @JoinColumn(name = "id_status")
    private Status status;

    @Column(length = 200)
    private String name;

    @Column(length = 100)
    private String pic;

    @Temporal(TemporalType.DATE)
    private Date start_date;

    @Temporal(TemporalType.DATE)
    private Date target_date;

    @JsonIgnore
    @Column(length = 50)
    private String createdby;

    @JsonIgnore
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @JsonIgnore
    @Column(length = 50)
    private String updatedBy;

    @JsonIgnore
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "project")
    private List<Report> daftarReport = new ArrayList<Report>();

}
