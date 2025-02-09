import { firstValueFrom, Observable } from 'rxjs';
import { CollectionRequest } from './../../models/collection-request.model';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { CollectionRequestService } from '../../services/collection-request.service';
import { RequestStatus } from '../../models/request-status.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeInLeft', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('1s ease-out')),
    ]),
    trigger('cardHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.05)' })),
      transition('normal <=> hover', animate('200ms ease-in-out')),
    ]),
    trigger('buttonHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.1)' })),
      transition('normal <=> hover', animate('200ms ease-in-out')),
    ]),
    trigger('parallax', [
      state('normal', style({ transform: 'translateY(0)' })),
      state('scrolled', style({ transform: 'translateY(-50px)' })),
      transition('normal <=> scrolled', animate('700ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent {
  title = 'EcoTrack';
  currentState = 'normal';
  defaultImage =
    'https://plus.unsplash.com/premium_photo-1683133531613-6a7db8847c72?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  collectionRequests!: Observable<CollectionRequest[]>;

  constructor(
    private collectionRequestService: CollectionRequestService,
    private authService: AuthService
  ) {
    console.log('Home component initialized');
    this.loadUserCollections();

  }

  loadUserCollections() {
    console.log(" Loading user collections");
    this.authService.getCurrentUser().subscribe((user) => {
      return (this.collectionRequests =
        this.collectionRequestService.getUserCollectionRequests(
          Number(user?.id) || 0
        ));
    });
    console.log("User collections loaded");
  }

  features = [
    {
      icon: 'M4 4v16h16M4 20l6-6 4 4 6-6',
      title: 'Suivi en Temps Réel',
      description: 'Suivez vos collectes et points de recyclage en temps réel.',
      image:
        'https://plus.unsplash.com/premium_photo-1683133531613-6a7db8847c72?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
      title: 'Communauté Engagée',
      description:
        'Rejoignez une communauté active de recyclage et contribuez à un avenir plus vert.',
      image:
        'https://plus.unsplash.com/premium_photo-1683063005230-ec93739b6dd8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
      title: 'Impact Écologique',
      description: 'Mesurez et améliorez votre impact environnemental.',
      image:
        'https://plus.unsplash.com/premium_photo-1683072005067-455d56d323b4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  heroImages = [
    'https://plus.unsplash.com/premium_photo-1663039947303-0fad26f737b8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1614201991207-765637dd6183?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1663091375659-94b729df2491?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1613166093303-e0dfaa9442b4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1663100061977-0d0d552d317a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1663040117567-ab8441cb7b04?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1663100085963-5261629872e7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  currentHeroImage = this.heroImages[0];
  currentFeatureState = 'normal';
  parallaxState = 'normal';
  currentImageIndex = 0;

  ngOnInit() {
    this.rotateHeroImages();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  rotateHeroImages() {
    setInterval(() => {
      const currentIndex = this.heroImages.indexOf(this.currentHeroImage);
      const nextIndex = (currentIndex + 1) % this.heroImages.length;
      this.currentHeroImage = this.heroImages[nextIndex];
    }, 5000);
  }

  toggleFeatureState(state: string) {
    this.currentFeatureState = state;
  }

  handleScroll() {
    const scrollPosition = window.scrollY;
    this.parallaxState = scrollPosition > 50 ? 'scrolled' : 'normal';
  }

  toggleHover(state: string) {
    this.currentState = state;
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      default: 'bg-gray-100 text-gray-800',
    };
    return statusClasses[status] || statusClasses['default'];
  }

  deleteRequest(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.collectionRequestService
          .deleteCollectionRequest(id)
          .subscribe(() => {});
          this.loadUserCollections();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
