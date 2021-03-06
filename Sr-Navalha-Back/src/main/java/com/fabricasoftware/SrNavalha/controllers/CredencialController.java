package com.fabricasoftware.SrNavalha.controllers;

import com.fabricasoftware.SrNavalha.models.Credencial;
import com.fabricasoftware.SrNavalha.services.CredencialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@RequestMapping(value = "/credenciais")
@CrossOrigin
public class CredencialController {

    @Autowired
    private CredencialService credencialService;

    @GetMapping
    public ResponseEntity<List<Credencial>> findAll() {
        List<Credencial> list = credencialService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    @RolesAllowed("cliente")
    public ResponseEntity<Credencial> create(@RequestBody Credencial credencial) {
        credencial = credencialService.create(credencial);
        return ResponseEntity.ok().body(credencial);
    }

    @PutMapping
    public ResponseEntity<Credencial> update(@RequestBody Credencial credencial) {
        credencial = credencialService.create(credencial);
        return ResponseEntity.ok().body(credencial);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        credencialService.delete(id);
        return  ResponseEntity.noContent().build();
    }
}
