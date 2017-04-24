package com.harahap.ibrahim.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * Created by Bensolo on 4/14/2017.
 */
@Data
@Entity
public class Report
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "id_programmer")
    private Programmer programmer;

    @NotNull(message = "Pilih Projectnya Bous")
    @ManyToOne
    @JoinColumn(name = "id_project")
    private Project project;

    @NotNull(message = "Pilih Status Projectnya Bous")
    @ManyToOne
    @JoinColumn(name = "id_status")
    private Status status;

    @NotNull(message = "Pilih Tanggalnya Bous")
    @Temporal(TemporalType.DATE)
    private Date tanggal;

    @NotNull(message = "Isi Yang Betul La Bous")
    @Size(min = 1,max = 200,message = "Apa Isi Laporanmu Bous")
    @Column(length = 200)
    private String uraian;

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

}
