import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit {
  registrarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
      role: ['user', Validators.required],  // Asegúrate de que el valor por defecto sea 'user'
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    const role = this.registrarUsuario.value.role;  // Asegúrate de obtener el valor del campo role correctamente
    const nombre = this.registrarUsuario.value.nombre;
    const apellido = this.registrarUsuario.value.apellido;
    const edad = this.registrarUsuario.value.edad;

    if (password !== repetirPassword) {
      this.toastr.error('Las contraseñas ingresadas deben ser las mismas', 'Error');
      return;
    }

    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          // Guardar el rol en Firestore junto con otros datos del usuario
          this.firestore.collection('users').doc(user.uid).set({
            email: email,
            role: role,
            nombre: nombre,
            apellido: apellido,
            edad: edad
          }).then(() => {
            this.verificarCorreo();
          }).catch((error) => {
            this.loading = false;
            this.toastr.error('Error al crear el usuario en Firestore', 'Error');
          });
        }
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  }

  verificarCorreo() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info('Le enviamos un correo electrónico para su verificación', 'Verificar correo');
        this.router.navigate(['/login']);
      });
  }
}
