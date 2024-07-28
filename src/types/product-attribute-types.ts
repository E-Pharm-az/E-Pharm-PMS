export interface ProductAttribute {
  id: number;
  name: string;
}

export interface ActiveIngredient extends ProductAttribute {
  description: string;
}

export interface Allergy extends ProductAttribute {}

export interface DosageForm extends ProductAttribute {}

export interface Indication extends ProductAttribute {}

export interface SpecialRequirement extends ProductAttribute {
  minimumAgeInMonthsRequirement: number;
  maximumAgeInMonthsRequirement: number;
  minimumWeighInKgRequirement: number;
  maximumWeighInKgRequirement: number;
  medicalConditionsDescription: string;
  otherRequirementsDescription: string;
}

export interface RegulatoryInformation extends ProductAttribute {
  approvalDate: Date
  certification: string;
}

export interface RouteOfAdministration extends ProductAttribute {}

export interface SideEffect extends ProductAttribute {}

export interface UsageWarning extends ProductAttribute {}

export interface Manufacturer extends ProductAttribute {
  country: string;
  website: string;
  email: string;
}

export interface Warehouse extends ProductAttribute {
  address: string;
  productInventory: number;
}
