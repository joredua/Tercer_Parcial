import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cards = [
    { title: 'SALES', value: '$2000', description: 'Better than last week (25%)' },
    { title: 'SUBSCRIPTIONS', value: '200', description: 'Worse than last week (25%)' },
    { title: 'TRAFFIC', value: '20000', description: 'Worse than last week (75%)' },
    { title: 'ORGANIC TRAFFIC', value: '2000', description: 'Better than last week (25%)' }
  ];
  dataUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.dataUser = user;
        console.log(user);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.toastr.success('Sesión cerrada exitosamente');
      this.router.navigate(['/portada']);
    }).catch(error => {
      this.toastr.error('Error al cerrar sesión', error.message);
    });
  }
}
