package com.practrel.practrel.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practrel.practrel.Entity.Libro;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Integer>{
    public List<Libro> findByTitulo(String pTitulo);
}
