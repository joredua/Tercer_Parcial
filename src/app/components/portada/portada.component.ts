// src/app/components/portada/portada.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {
  slides = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1617184003139-6eda6e09f1c3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'INDIA',
      topic: 'Holi',
      description: 'Holi has been celebrated in the Indian subcontinent for centuries...'
    },
    // Agrega aquí los demás slides con sus respectivos datos
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes inicializar cualquier lógica necesaria para tu componente
  }

  showSlider(type: string) {
    // Implementa la lógica para mostrar el slider según el tipo (next o prev)
    // Puedes utilizar una lógica similar a la que ya tienes implementada
  }
}

