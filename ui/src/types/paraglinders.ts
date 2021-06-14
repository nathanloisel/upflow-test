export type CENCertifications = 'A' | 'B' | 'C' | 'D';
export type ParaglindingPractices =
  | 'ecole'
  | 'cross'
  | 'hikeNfly'
  | 'acro'
  | 'comp';

export interface IParaglinder {
  name: string;
  brand: string;
  allon: number;
  CEN: CENCertifications;
  practice: ParaglindingPractices;
  ratio: number;
}
