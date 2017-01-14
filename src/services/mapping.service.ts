import { Injectable } from '@angular/core';
import { ITrainee, IGrade } from './../app/interface'

@Injectable()
export class MappingService {

    constructor() { }

    private gradesIntoArray(gradesObject): IGrade[] {
        debugger
        let gradesArray = []
        Object.keys(gradesObject).map(ky => {
            gradesArray.push({
                subject: gradesObject[ky].subject,
                date: gradesObject[ky].date,
                score: gradesObject[ky].score,
                index: ky
            })
        })
        return gradesArray

    }

    private gradesIntoObject(gradesArray: IGrade[]) {
        let gradesObject = {}
        gradesArray.map((grade) => {
            gradesObject[grade.index.toString()] = { date: grade.date, score: grade.score, subject: grade.subject }
        })
        debugger
        return gradesObject
    }

    traineeFromServerToApp(trainee): ITrainee {
        debugger
        return ({
            address: {
                city: trainee.address.city,
                country: trainee.address.country,
                street: trainee.address.street,
                zip: trainee.address.zip
            },
            dateJoin: trainee.dateJoin,
            email: trainee.email,
            grades: trainee.grades ? this.gradesIntoArray(trainee.grades) : [],
            id: trainee.id,
            name: trainee.name
        })
    }

    traineeFromAppToServer(trainee: ITrainee) {
        debugger
        let trainneObj = Object.assign(trainee)
        if (trainee.grades && trainee.grades.length) {
            trainneObj.grades = this.gradesIntoObject(trainee.grades)
        }
        return trainneObj
    }
}
