import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { PortadaComponent } from './components/portada/portada.component';
import { ShowComponent } from './components/show/show.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { MoviessMostPopularComponent } from './moviess/moviess-most-popular/moviess-most-popular.component';
import { MoviessTopComponent } from './moviess/moviess-top/moviess-top.component';
import { MoviesComponent } from './components/movies/movies.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { RoleGuard } from './guards/role.guard';


const routes: Routes = [
  { path: '', redirectTo: 'portada', pathMatch: 'full' },
  { path: 'portada', component: PortadaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'show', component: ShowComponent,canActivate: [AuthGuard, RoleGuard],data: { expectedRole: 'admin' }},
  { path: 'create', component: CreateComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'video-player', component: VideoPlayerComponent },
  { path: 'moviess-most-popular', component: MoviessMostPopularComponent },
  { path: 'user-view', component: UserViewComponent },
  { path: 'moviess-top', component: MoviessTopComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'peliculas', component: PeliculasComponent},
  { path: 'search', component: SearchComponent},
  { path: 'movie/:id', component: MovieDetailsComponent},
  { path: 'home', component: HomeComponent},
  { path: 'list-users', component: ListUsersComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'admin' }},
  { path: '**', redirectTo: 'portada', pathMatch: 'full' }, // Ruta comodín para manejar rutas no definidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
