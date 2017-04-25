package com.harahap.ibrahim.domain;

import javax.validation.constraints.NotNull;

/**
 * Created by Aim MSI on 4/25/2017.
 */
public class Pdf {

    private Integer Id;

    @NotNull(message = "Pilih Tahun Bous")
    private Integer year;

    @NotNull(message = "Pilih Bulan Bous")
    private Integer month;

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }
}
