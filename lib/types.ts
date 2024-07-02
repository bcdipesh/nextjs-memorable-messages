export interface Occasion {
  id: string;
  occasionType: string;
  message: string;
  receiverEmail: string;
  deliveryMethod: string;
  deliveryDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
