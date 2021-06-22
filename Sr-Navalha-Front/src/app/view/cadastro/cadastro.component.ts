import { usuarioCredencial } from './../../models/UsuarioCredencial';
import { Router, RouterLink } from '@angular/router';
import { UsuarioBarbeiroService } from './../../controllers/usuario-barbeiro.service';
import { UsuarioBarbeiro } from './../../models/usuarioBarbeiro';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from 'src/app/controllers/consulta-cep.service';
import { UsuarioClienteService } from 'src/app/controllers/usuario-cliente.service';
import { Cidade } from 'src/app/models/cidade';
import { Credencial } from 'src/app/models/credencial';
import { Endereco } from 'src/app/models/endereco';
import { UsuarioCliente } from 'src/app/models/usuario-cliente';
import { LoginKeycloakService } from 'src/app/controllers/loginKeykloac.service';

@Component({
  selector: 'ads-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  credencial: Credencial = {
    id: '',
    email: '',
    senha: ''
  }

  cidade: Cidade = {
    id: '',
    localidade: '',
    uf: '',
  }

  endereco: Endereco = {
    id: '',
    bairro: '',
    logradouro: '',
    numero: '',
    cep: '',
    cidade: this.cidade,
  }

  novoCliente: UsuarioCliente = {
    id: '',
    nome: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    tipo: '',
    endereco: this.endereco,
    credencial: this.credencial,
  }

  novoBarbeiro: UsuarioBarbeiro = {
    id: '',
    nome: '',
    telefone: '',
    email: '',
    dataNascimento: new Date(),
    cpf: '',
    tipo: '',
    endereco: this.endereco,
    credencial: this.credencial,

  }

  usuarioToken: usuarioCredencial = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    roles: '',
  };

  enderecoCep: any = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    unidade: '',
    ibge: '',
    gia: ''
  }


  constructor(private consulta: ConsultaCepService, private usuarioBarbeiroService: UsuarioBarbeiroService, private usuarioClienteService: UsuarioClienteService,  private router: Router , private loginK: LoginKeycloakService) { }

  ngOnInit(): void {
  }

  // Busca CEP

  buscarEndereco(cepInput: any) {
    this.consulta.consultaCEP(cepInput.value).subscribe((retorno) => {
      this.enderecoCep = retorno
    })
  }

  // Cliente 


  create(): void {
    this.usuarioClienteService.create(this.novoCliente).subscribe((resposta) => {
    });
    if (this.novoCliente.nome == "" || this.novoCliente.nome == null) {
      confirm("Insira o nome do cliente!")
    }
    alert("Cliente cadastrado com sucesso!")
    location.reload();
  }

  update(): void {
    this.usuarioClienteService.update(this.novoCliente).subscribe((resposta) => {
      location.reload;
    });
    alert("Cliente alterado com sucesso!")
    location.reload();
  }

  delete(usuarioCliente: UsuarioCliente) {
    this.usuarioClienteService.delete(usuarioCliente.id).subscribe((resposta) => {
      location.reload;
    })
    alert("Cliente excluido com sucesso!")
    location.reload();
  }


  // Barbeiro

  createBarbeiro(): void {
    this.usuarioBarbeiroService.createBarbeiro(this.novoBarbeiro).subscribe((resposta) => {
    });
    alert("Barbeiro cadastrado com sucesso!")
    location.reload;
  }
  updateBarbeiro(): void {
    this.usuarioBarbeiroService.updateBarbeiro(this.novoBarbeiro).subscribe((resposta) => {
    });
    alert("Barbeiro alterado com sucesso!")
    location.reload();
  }

  deleteBarbeiro(usuarioBarbeiro: UsuarioBarbeiro) {
    this.usuarioBarbeiroService.deleteBarbeiro(usuarioBarbeiro.id).subscribe((resposta) => {
    })
    alert("Barbeiro excluido com sucesso!")
    location.reload();
  }

  // Tipo 

  getTipo(tip: any) {
    this.novoCliente.tipo = tip.value
    this.novoBarbeiro.tipo = tip.value
  }

  // Button Create Barbeiro/Cliente

  public createCheck() {
    if (this.novoBarbeiro.tipo == null || this.novoBarbeiro.tipo == "" || this.novoCliente.tipo == null || this.novoCliente.tipo == "") {
      alert("Barbeiro ou Cliente? Selecione para continuar seu Cadastro!")
    } else {
    if (this.novoCliente.tipo == 'cliente') {
      this.create();
      this.createTokenUser(this.novoCliente)
      this.loginK.login()
    } else {
      this.createBarbeiro();
      this.createTokenUserBarbeiro(this.novoBarbeiro)
      this.loginK.login()
    }
  }

  }

  //Create Token Barbeiro

  createTokenUserBarbeiro(novoCliente: UsuarioBarbeiro) {
    let username: any[] = novoCliente.nome.split(" ");

    this.usuarioToken.username = username[0];
    this.usuarioToken.firstName = username[0];
    this.usuarioToken.lastName = this.returnLastName(username);

    this.usuarioToken.password = novoCliente.credencial.senha;
    this.usuarioToken.email = novoCliente.email;
    this.usuarioToken.roles = novoCliente.tipo;
    this.usuarioClienteService.createUserToken(this.usuarioToken).subscribe((result: any) => {
      console.log(result)
    })
  }

  // Create Token Cliente


  createTokenUser(novoCliente: UsuarioCliente) {

    let username: any[] = novoCliente.nome.split(" ");

    this.usuarioToken.username = username[0];
    this.usuarioToken.firstName = username[0];
    this.usuarioToken.lastName = this.returnLastName(username);

    this.usuarioToken.email = novoCliente.email;
    this.usuarioToken.password = novoCliente.credencial.senha;
    this.usuarioToken.roles = novoCliente.tipo;
    this.usuarioClienteService.createUserToken(this.usuarioToken).subscribe((result: any) => {
      console.log(result)
    })
  }

  returnLastName(fullName: any[]) {
    var element = ""
    for (let index = 1; index < fullName.length; index++) {
      element += fullName[index] + " ";
    }
    return element
  }


}