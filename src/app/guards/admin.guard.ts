import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).get().pipe(
            map(doc => {
              const userData = doc.data();
              if (userData && userData['role'] === 'admin') {
                return true;
              } else {
                this.router.navigate(['/user-dashboard']);
                return false;
              }
            }),
            catchError(() => {
              this.router.navigate(['/user-dashboard']);
              return of(false);
            })
          );
        } else {
          this.router.navigate(['/login']);
          return of(false);
        }
      })
    );
  }
}
