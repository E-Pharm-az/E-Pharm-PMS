export interface ProductAttribute {
  id: number;
  name: string;
}

export interface ActiveIngredient extends ProductAttribute {
  id: number;
  name: string;
}

export interface Allergy extends ProductAttribute {
  id: number;
  name: string;
}

export interface DosageForm extends ProductAttribute {
  id: number;
  name: string;
}

export interface Indication extends ProductAttribute {
  id: number;
  name: string;
}

export interface RouteOfAdministration extends ProductAttribute {
  id: number;
  name: string;
}

export interface SideEffect extends ProductAttribute {
  id: number;
  name: string;
}

export interface UsageWarning extends ProductAttribute {
  id: number;
  name: string;
}

export interface Manufacturer extends ProductAttribute {
  id: number;
  name: string;
}
