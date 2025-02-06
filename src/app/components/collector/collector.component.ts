import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { CollectionRequest } from '../../models/collection-request.model';
import { CollectionRequestService } from '../../services/collection-request.service';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collector',
  imports: [CommonModule, NavbarComponent, SidebarComponent],
  templateUrl: './collector.component.html',
  styleUrl: './collector.component.css',
})
export class CollectorComponent {
  statusOptions = ['pending', 'accepted', 'rejected', 'completed'];

  defaultImage =
    'https://plus.unsplash.com/premium_photo-1683133531613-6a7db8847c72?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  collectionRequests!: Observable<CollectionRequest[]>;
  openDropdownId: string | null = null;

  private pointsMap: { [key: string]: number } = {
    'plastic': 2,
    'glass': 1,
    'paper': 1,
    'metal': 5
  };

  constructor(
    private collectionRequestService: CollectionRequestService,
    private authService: AuthService
  ) {
    this.loadCollections();
  }

  loadCollections() {

    this.authService.getCurrentUser().pipe(
      switchMap(currentUser => {
        if (!currentUser) {
          return of([]);
        }

        return this.collectionRequestService.getCollectionRequestsWithStatusPending(currentUser.address);
      })
    ).subscribe({
      next: (requests) => {
        this.collectionRequests = of(requests);
      },
      error: (error) => {
        console.error('Error fetching collection requests:', error);
      }
    });

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




  updateStatus(request: CollectionRequest, newStatus: string, event: Event) {
    event.stopPropagation();
    this.openDropdownId = null;

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update status!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedRequest = { ...request, status: newStatus };

        if (newStatus === 'accepted' || newStatus === 'completed') {
          const pointsEarned = this.calculatePoints(request);

          this.collectionRequestService.addPoints(request.userId, pointsEarned).pipe(
            switchMap(() => this.collectionRequestService.updateCollectionRequest(request.id!, updatedRequest))
          ).subscribe({
            next: () => {
              Swal.fire({
                title: 'Success!',
                text: `Request status updated to ${newStatus}. Earned ${pointsEarned} points!`,
                icon: 'success',
              });
              this.loadCollections();
            },
            error: (error) => {
              console.error('Error updating status or points:', error);
              Swal.fire({
                title: 'Error',
                text: 'Failed to update status or points. Please try again.',
                icon: 'error',
              });
            },
          });
        } else {
          this.collectionRequestService.updateCollectionRequest(request.id!, updatedRequest).subscribe({
            next: () => {
              Swal.fire({
                title: 'Success!',
                text: `Request status updated to ${newStatus}`,
                icon: 'success',
              });
              this.loadCollections();
            },
            error: (error) => {
              console.error('Error updating status:', error);
              Swal.fire({
                title: 'Error',
                text: 'Failed to update status. Please try again.',
                icon: 'error',
              });
            },
          });
        }
      }
    });
  }


  toggleDropdown(requestId: string, event: Event) {
    event.stopPropagation();
    this.openDropdownId = this.openDropdownId === requestId ? null : requestId;
  }

  private calculatePoints(request: CollectionRequest): number {
    const wasteTypePointRate = this.pointsMap[request.wasteType.toLowerCase()] || 0;
    return wasteTypePointRate * request.estimatedWeight;
  }
}
