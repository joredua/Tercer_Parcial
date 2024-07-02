import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService,
    private firestore: AngularFirestore
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        this.firestore.collection('users').doc(user.uid).get().subscribe((doc) => {
          if (doc.exists) {
            const userData = doc.data() as { role: string }; // Especificar el tipo de datos esperado
            this.loading = false;
            localStorage.setItem('userRole', userData.role); // Guardar el rol en el localStorage
            this.router.navigate(['/dashboard']);
          } else {
            this.loading = false;
            this.toastr.error('No se encontró el rol del usuario', 'Error');
          }
        });
      } else {
        this.loading = false;
        this.toastr.error('No se encontró el usuario', 'Error');
      }
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    });
  }

  loginWithGoogle(): void {
    this.loading = true;
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(userCredential => {
        const user = userCredential.user;
        if (user) {
          this.firestore.collection('users').doc(user.uid).get().subscribe(doc => {
            if (!doc.exists) {
              // Si el usuario no existe en Firestore, agregarlo con un rol por defecto (user)
              this.firestore.collection('users').doc(user.uid).set({
                email: user.email,
                role: 'user'
              }).then(() => {
                this.loading = false;
                this.router.navigate(['/dashboard']);
              });
            } else {
              this.loading = false;
              this.router.navigate(['/dashboard']);
            }
          });
        }
      })
      .catch(error => {
        this.loading = false;
        this.toastr.error(error.message, 'Error');
      });
  }
}
