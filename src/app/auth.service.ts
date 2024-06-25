// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string>('guest');
  private userData: any;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.isAuthenticatedSubject.next(true);
          return this.firestore.doc(`users/${user.uid}`).valueChanges();
        } else {
          this.isAuthenticatedSubject.next(false);
          return [];
        }
      })
    ).subscribe((userData: any) => {
      this.userData = userData;
      this.userRoleSubject.next(userData?.role || 'guest');
    });
  }

  login(role: string): void {
    this.isAuthenticatedSubject.next(true);
    this.userRoleSubject.next(role);
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next('guest');
    this.afAuth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUserRole(): Observable<string> {
    return this.userRoleSubject.asObservable();
  }
}
