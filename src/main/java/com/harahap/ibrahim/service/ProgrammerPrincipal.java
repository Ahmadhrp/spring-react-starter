package com.harahap.ibrahim.service;

import com.harahap.ibrahim.domain.Programmer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * Created by Aim MSI on 5/5/2017.
 */
public class ProgrammerPrincipal implements UserDetails {
    private Programmer programmer;

    public ProgrammerPrincipal(Programmer programmer) {
        this.programmer = programmer;
    }

    public Programmer getProgrammer() {
        return programmer;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
