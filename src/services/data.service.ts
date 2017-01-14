import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2'
import { ITrainee, ISubjects } from './../app/interface'
import { MappingService } from './mapping.service'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'
import {Paths} from './firebase.paths'
@Injectable()
export class DataService {
    mappingService: MappingService
    constructor(private angularFire: AngularFire, @Inject(MappingService) mappingService: MappingService) {
        this.mappingService = mappingService
    }

    getAllTrainees(): Observable<ITrainee[]> {
        return new Observable(observer => {
            //getting async data from server
            let subscription = this.angularFire.database.list(Paths.trainees)
                .subscribe((trainees) => {
                    //mapping the response from the server (deleting unnecessary data, formating the data, etc)
                    observer.next(
                        //using rxjs mapping
                        trainees.map(trainee => {
                            //calling mapping service to map each trainee
                            return (this.mappingService.traineeFromServerToApp(trainee))
                        })
                    )
                    //subscription.unsubscribe()
                }, err => observer.error(err))
        })
    }

    getSubjects() : FirebaseListObservable<ISubjects[]>{
        return this.angularFire.database.list(Paths.subjects)
    }

    getTraineeById(traineeID: string): Observable<ITrainee> {
        return new Observable(observer => {
            let subscription = this.angularFire.database.object(`${Paths.trainees}/${traineeID}`)
                .subscribe((trainee) => {
                    observer.next(this.mappingService.traineeFromServerToApp(trainee))
                }, err=> observer.error(err))
        })
    }

    removeTraineeById(traineeID: string): firebase.Promise < any > {
                return this.angularFire.database.object(`${Paths.trainees}/${traineeID}`).remove()
            }

    setTrainee(trainee: ITrainee): firebase.Promise <any> {
                return this.angularFire.database.object(`${Paths.trainees}/${trainee.id}`)
                            .update(this.mappingService.traineeFromAppToServer(trainee))
            }




}
