package com.harahap.ibrahim.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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

    @NotNull(message = "Pilih Status Project Bous")
    @ManyToOne
    @JoinColumn(name = "id_status")
    private Status status;

    @NotNull(message = "Nama Project Ga Boleh Kosong Bous")
    @Size(min = 1,max = 140,message = "Masukkan Nama Projectnya Bous")
    @Column(length = 200)
    private String name;

    @NotNull(message = "Nama PIC Ga Boleh Kosong Bous")
    @Size(min = 1,max = 100, message="Masukkan Nama PICnya Bous")
    @Column(length = 100)
    private String pic;

    @Column(length = 140)
    private String foto;

    @NotNull(message = "Pilih Tanggal Startnya Bous")
    @Temporal(TemporalType.DATE)
    private Date start_date;

    @NotNull(message = "Pilih Tanggal Targetnya Bous")
    @Temporal(TemporalType.DATE)
    private Date target_date;

    @Column(length = 50)
    private String createdby;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(length = 50)
    private String updatedBy;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "project")
    private List<Report> daftarReport = new ArrayList<Report>();

}
