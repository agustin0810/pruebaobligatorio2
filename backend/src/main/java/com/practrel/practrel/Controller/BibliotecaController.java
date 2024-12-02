package com.practrel.practrel.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practrel.practrel.AppException;
import com.practrel.practrel.Entity.Biblioteca;
import com.practrel.practrel.Repository.BibliotecaRepository;
import com.practrel.practrel.Service.BibliotecaService;

@RestController
@RequestMapping("/biblioteca")
@CrossOrigin(origins = "http://localhost:3000")
public class BibliotecaController {

    @Autowired
    private BibliotecaRepository bibliotecaRepository;

    @Autowired
    private BibliotecaService bibliotecaService;
   
    @PostMapping
    public ResponseEntity<?> altaBiblioteca(@RequestBody Biblioteca biblioteca){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(bibliotecaService.agregar(biblioteca));
        } 
        catch(AppException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @PutMapping
    public ResponseEntity<?> modificacionBiblioteca(@RequestBody Biblioteca biblioteca){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(bibliotecaRepository.save(biblioteca));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminacionBiblioteca(@PathVariable int id){
        try {
            bibliotecaRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> conseguirBiblioteca(@PathVariable int id){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(bibliotecaRepository.findById(id));
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

    @GetMapping
    public ResponseEntity<?> conseguirBibliotecas(){
        try {
            
            return ResponseEntity.status(HttpStatus.OK).body(bibliotecaRepository.findAll());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Problema interno en el servidor");
        }
    }

}
