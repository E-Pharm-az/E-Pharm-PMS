export interface ProductAttribute {
  id: number;
  name: string;
}

export interface ActiveIngredient extends ProductAttribute {}

export interface Allergy extends ProductAttribute {}

export interface DosageForm extends ProductAttribute {}

export interface Indication extends ProductAttribute {}

export interface RouteOfAdministration extends ProductAttribute {}

export interface SideEffect extends ProductAttribute {}

export interface UsageWarning extends ProductAttribute {}

export interface Manufacturer extends ProductAttribute {}
