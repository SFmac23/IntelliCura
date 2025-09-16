/**
 * Collection ID: phasetwofeatures
 * Interface for PhaseTwoFeatures
 */
export interface PhaseTwoFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  featureName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  featureIcon?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
}
