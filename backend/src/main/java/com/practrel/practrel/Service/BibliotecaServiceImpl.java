package com.practrel.practrel.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.practrel.practrel.AppException;
import com.practrel.practrel.Entity.Biblioteca;
import com.practrel.practrel.Repository.BibliotecaRepository;

@Service
public class BibliotecaServiceImpl implements BibliotecaService{
    @Autowired
    private BibliotecaRepository bibliotecaRepository;
    
    public Biblioteca agregar(Biblioteca b) throws AppException{
        if(bibliotecaRepository.existsByDireccion(b.getDireccion()))
            throw new AppException("Ya existe una biblioteca con la direccion asignada");
        return bibliotecaRepository.save(b);
    }
}
