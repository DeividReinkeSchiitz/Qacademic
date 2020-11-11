
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
   [year:string]:classNameMaterialI
}

// Grades type
interface twoMonthI {
   grade: number,
   concept: number,
   missedClasses:number
}
interface classNameGradesI {
 [className:string]:Array<twoMonthI>
}

export interface gradesI {
 [year:string]:classNameGradesI
}

export interface studentI{
   name:string,
   grades:gradesI,
   classMaterial:classMaterialsI
}

/*
   Student:{
      '2020':{
         'filosofia':[
            {
               grade:xx,
               missedClasses:xx,
               concept:xx,
            }
         ],
         'geografia':[
            {
               grade:xx,
               missedClasses:xx,
               concept:xx,
            }
         ],
      }
   }
*/
