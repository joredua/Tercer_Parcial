import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data['expectedRole'];
    
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return [false];
        }
        return this.firestore.collection('users').doc(user.uid).get().pipe(
          map(doc => {
            const userData = doc.data();
            return userData && userData['role'] === expectedRole;
          })
        );
      }),
      tap(hasRole => {
        if (!hasRole) {
          this.router.navigate(['/not-authorized']);
        }
      })
    );
  }
}
