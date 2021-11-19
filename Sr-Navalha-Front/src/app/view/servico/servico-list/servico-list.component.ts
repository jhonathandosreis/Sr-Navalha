import { Router } from '@angular/router';
import { LoginKeycloakService } from './../../../controllers/loginKeykloac.service';
import { ServicoService } from './../../../controllers/servico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ads-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']

})
export class ServicoListComponent implements OnInit {

  servicos: any[] = [];
  avaliacoes: any[] = []
  constructor(private servicoLogin: LoginKeycloakService,
    private route: Router,
    private servicoservice: ServicoService) { }

  ngOnInit(): void {
    this.getAllServicos()
  }

  getAllServicos() {
    this.servicoservice.findAllServicos().subscribe((result) => { this.servicos = result });
  }

  agendar(id: any) {
    if (this.servicoLogin.getIsLogged()) {
      this.route.navigate([`/agendamento/novo/${id}`])
    } else {
      alert("Você não esta logado!")
      this.servicoLogin.login();
    }
  }

  getAvaliacoes() {
    var avaliacoes = []
    for (let index = 0; index < this.servicos.length; index++) {
      if (this.servicos[index].avaliacoes.length > 0) {
        avaliacoes.push(this.servicos[index].avaliacoes[index]);
        this.avaliacoes.push(this.servicos[index].avaliacoes as {});
      }
    }
    console.log(this.avaliacoes)
  }
}
