import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

import { environment } from 'src/environments/environment';
import { PortadaComponent } from './components/portada/portada.component';
import { FooterComponent } from './components/footer/footer.component';


import {YouTubePlayerModule} from '@angular/youtube-player';
import { ShowComponent } from './components/show/show.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { MoviesComponent } from './components/movies/movies.component';

import { MoviessMostPopularComponent } from './moviess/moviess-most-popular/moviess-most-popular.component';
import { MoviessTopComponent } from './moviess/moviess-top/moviess-top.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { AuthService } from './auth.service';
import { VideoService } from './components/video-player/video.servicio';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieApiServiceService } from './service/movie-api-service.service';
import { ListUsersComponent } from './components/list-users/list-users.component';

//importar las clases de trabajo de firestore


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
    SpinnerComponent,
    PortadaComponent,
    FooterComponent,
   
    ShowComponent,
    EditComponent,
    CreateComponent,
    MoviesComponent,
    MoviessMostPopularComponent,
    MoviessTopComponent,
    VideoPlayerComponent,
    UserViewComponent,
    PeliculasComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailsComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    YouTubePlayerModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [AuthService, VideoService,MovieApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
