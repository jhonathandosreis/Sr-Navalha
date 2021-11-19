import { NavMaterialComponent } from './view/material/nav/nav.component';
import { FooterMaterialComponent } from './view/material/footer/footer.component';
import { MaterialModule } from './../assets/material/material.module';
import { AuthGuard } from './auth.guard';
import { PerfilClienteComponent } from './view/perfil-cliente/perfil-cliente.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/login/login.component';
import { HomeComponent } from './view/home/home.component';
import { FooterComponent } from './view/footer/footer.component';
import { HeaderComponent } from './view/header/header.component';
import { AdminComponent } from './view/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgendamentoComponent } from './view/agendamento/agendamento.component';
import { AuthInterceptor } from './http.interceptor';
import { CadastroComponent } from './view/cadastro/cadastro.component';
import { TelaClienteComponent } from './view/tela-cliente/tela-cliente.component';
import { TelaBarbeiroComponent } from './view/tela-barbeiro/tela-barbeiro.component';
import { ServicoComponent } from './view/servico/servico.component';
import { PortfolioComponent } from './view/portfolio/portfolio.component';
import { AgendamentosComponent } from './view/agendamento/agendamentos/agendamentos.component';
import { ServicoListComponent } from './view/servico/servico-list/servico-list.component';
import { SpinnerComponent } from './view/spinner/spinner.component';
import { UpdateAgendamentoComponent } from './view/agendamento/update-agendamento/update-agendamento.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ServicoListBarbeiroComponent } from './view/servico/servico-list-barbeiro/servico-list-barbeiro.component';
import { TelaClienteAdminComponent } from './view/tela-cliente/tela-cliente-admin/tela-cliente-admin.component';
import { TelaBarbeiroAdminComponent } from './view/tela-barbeiro/tela-barbeiro-admin/tela-barbeiro-admin.component';
import { NotFoundComponent } from './view/not-found/not-found.component';
import { DateFormatePipe } from './date-formate.pipe';
import { HeaderMaterialComponent } from './view/material/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    AdminComponent,
    AgendamentoComponent,
    CadastroComponent,
    TelaClienteComponent,
    TelaBarbeiroComponent,
    ServicoComponent,
    PortfolioComponent,
    AgendamentosComponent,
    ServicoListComponent,
    SpinnerComponent,
    UpdateAgendamentoComponent,
    PerfilClienteComponent,
    ServicoListBarbeiroComponent,
    TelaClienteAdminComponent,
    TelaClienteAdminComponent,
    TelaBarbeiroAdminComponent,
    NotFoundComponent,
    TelaClienteAdminComponent,
    FooterMaterialComponent,
    HeaderMaterialComponent,
    NavMaterialComponent,
    TelaBarbeiroAdminComponent, DateFormatePipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8080/foo'],
        sendAccessToken: true
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, { provide: LOCALE_ID, useValue: 'pt-Br' }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
