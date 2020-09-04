
// Material type
interface materialValueI {
   publicationData:string
   material:string
   obs:string
}

interface classNameMaterialI{
   [className:string]:Array<materialValueI>
}

export interface classMaterialsI{
   [year:string]:classNameI
}

// Grades type
interface twoMonthI {
   'grade': number,
   'concept': number,
   'missedClasses':number
}
interface classNameGradesI {
 [className:string]:Array<twoMonthI>
}

export interface userDataI {
 [year:string]:classNameGradesI
}
