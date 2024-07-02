import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  role: string | null = null;
  content: any[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.firestore.collection('users').doc(user.uid).get().subscribe(doc => {
          const userData = doc.data();
          if (userData) {
            this.role = userData['role'];
            this.dataUser = user;
            this.loadContent();
          } else {
            this.router.navigate(['/login']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  loadContent(): void {
    if (this.role === 'admin') {
      // Cargar todo el contenido
      this.content = [
        { title: 'Admin Content 1' },
        { title: 'Admin Content 2' },
        { title: 'Admin Content 3' }
      ];
    } else if (this.role === 'user') {
      // Cargar solo videos y películas
      this.content = [
        { title: 'User Content 1' },
        { title: 'User Content 2' }
      ];
    }
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.toastr.success('Sesión cerrada exitosamente');
      this.router.navigate(['/portada']);
    }).catch(error => {
      this.toastr.error('Error al cerrar sesión', error.message);
    });
  }

  navbg: any;
  @HostListener('document:scroll') scrollover() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#FFFf'
      };
    } else {
      this.navbg = {};
    }
  }
}
