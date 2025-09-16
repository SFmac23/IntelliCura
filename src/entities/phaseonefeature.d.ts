/**
 * Collection ID: phaseonefeatures
 * Interface for PhaseOneFeatures
 */
export interface PhaseOneFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  featureName?: string;
  /** @wixFieldType text */
  featureDescription?: string;
  /** @wixFieldType image */
  featureIcon?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType url */
  callToActionUrl?: string;
}
