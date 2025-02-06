import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionRequest } from '../../models/collection-request.model';
import { CollectionRequestService } from '../../services/collection-request.service';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";

@Component({
  selector: 'app-collector',
  imports: [CommonModule, NavbarComponent, SidebarComponent],
  templateUrl: './collector.component.html',
  styleUrl: './collector.component.css'
})
export class CollectorComponent {


   defaultImage =
      'https://plus.unsplash.com/premium_photo-1683133531613-6a7db8847c72?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    collectionRequests!: Observable<CollectionRequest[]>;

    constructor(
      private collectionRequestService: CollectionRequestService,
      private authService: AuthService
    ) {
      this.loadCollections();

    }

    loadCollections() {

         this.collectionRequests = this.collectionRequestService.getCollectionRequestsWithStatusPending();
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

}
