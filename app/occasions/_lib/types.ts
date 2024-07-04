export interface Occasion {
  id: string;
  occasionType: string;
  message: string;
  receiverEmail: string;
  deliveryMethod: "Email" | "SMS";
  deliveryDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
