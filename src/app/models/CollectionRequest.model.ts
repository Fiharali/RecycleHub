
interface CollectionRequest {
  id: string;
  userId: string;
  wasteType: string;
  photos: string[];
  estimatedWeight: number;
  collectionAddress: string;
  desiredDate: string;
  desiredTimeSlot: string;
  notes: string;
  status: string;
}
