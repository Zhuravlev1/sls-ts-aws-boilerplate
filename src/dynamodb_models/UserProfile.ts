import {S3ImageUrl} from '../../utils';

export interface UserProfile {
  userId: string;
  name: string;
  about: string;
  recordState: string;
  city: string;
  street: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  profileImage: S3ImageUrl;
}
