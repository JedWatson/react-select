export interface ColourOption {
  value: string;
  label: string;
  color: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

export interface FlavourOption {
  value: string;
  label: string;
  rating: string;
}

export interface GroupedOption {
  label: string;
  options: ColourOption[] | FlavourOption[];
}

interface DogOption {
  id: number;
  label: string;
}

interface OptionLength {
  value: number;
  label: string;
}

export const colourOptions: ColourOption[];
export const flavourOptions: FlavourOption[];
export const optionLength: OptionLength[];
export const dogOptions: DogOption[];
export const groupedOptions: GroupedOption[];
