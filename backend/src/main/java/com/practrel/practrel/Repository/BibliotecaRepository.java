package com.practrel.practrel.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practrel.practrel.Entity.Biblioteca;

public interface BibliotecaRepository extends JpaRepository<Biblioteca, Integer> {
    public boolean existsByDireccion(String direccion);
}
