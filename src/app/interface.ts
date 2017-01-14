
export interface ITrainee {
    id : string,
    name : string,
    email : string,
    address: IAddress,
    dateJoin : string,
    grades? : IGrade[]
}

export interface IAddress {
    street : string,
    city : string,
    country: string,
    zip : string
}

export interface IGrade {
    subject: ISubjects,
    date : string,
    score : number,
    index? : string
}

export interface IGradeToShow extends IGrade {
    id : string
    name : string
}

export interface  ISubjects {
    name: string
}