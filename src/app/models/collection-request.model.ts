export interface CollectionRequest {
  id?: number;
  userId: number;
  wasteType: string; // 'plastic', 'glass', 'paper', 'metal'
  photos?: string[];
  estimatedWeight: number;
  collectionAddress: string;
  desiredDate: string;
  desiredTimeSlot: string;
  notes?: string;
  status: string; // 'pending', 'occupied', 'in_progress', 'validated', 'rejected'
}
