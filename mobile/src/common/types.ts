// STUDENT INTERFACE //
export interface materialValueI {
  publicationData: string;
  material: string;
  obs: string;
}

interface classNameMaterialI {
  [className: string]: materialValueI[];
}

interface classMaterialsI {
  [year: string]: classNameMaterialI;
}

export interface twoMonthI {
  grade: number;
  concept: number;
  missedClasses: number;
}
export interface classNameGradesI {
  [className: string]: twoMonthI[];
}

export interface gradesI {
  [year: string]: classNameGradesI;
}

export interface studentI {
  name: string;
  grades: gradesI;
  classMaterial: classMaterialsI;
}
/*---------------------------- */
