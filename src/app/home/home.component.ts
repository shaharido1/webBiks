import { Component, OnInit, OnDestroy, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { ITrainee, IGradeToShow } from './../interface'
import { DataService } from './../../services/data.service'
import { Subscription } from 'rxjs/Subscription';
import { TRAINEE } from './../URL'
import { ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  queryText: string
  sub: Subscription
  //defualt page for pagination 
  page: number = 1;
  selectedRow: number
  trainees: Array<ITrainee>
  allGrades: Array<IGradeToShow>
  displayGrades: Array<IGradeToShow>
  selectedTraineeId: string
  constructor(
    public dataService: DataService,
    public router: Router,
    public toast: ToasterService,
    public vRef: ViewContainerRef) {
  }

  ngOnInit() {
    //loading the data from the dataService
    this.sub = this.dataService.getAllTrainees().subscribe((trainees) => {
      //assinging the data  
      this.trainees = trainees
      //formating it for the required display(all grades mixed between users)
      this.allGrades = this.getGrades(this.trainees)
      //creating display variable for the later filtering
      this.displayGrades = this.allGrades
    }, err => {
      console.log(err)
    })
  }
  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe() }
  }

  private getGrades(trainees: Array<ITrainee>): Array<IGradeToShow> {
    let allGrades = []
    //mapping the data(grades) for display
    trainees.forEach((trainee) => {
      if (trainee.grades) {
        trainee.grades.forEach(grade => {
          allGrades.push({
            id: trainee.id,
            name: trainee.name,
            date: grade.date,
            score: grade.score,
            subject: grade.subject
          })
        })
      }
    })
    return allGrades
  }

  goToTraineePage(traineeID: string) {
    this.router.navigate([`/${TRAINEE}/${traineeID}`])
  }

  searchGrades() {
    //filtering the allgrades and assinging it to the display variable
    this.displayGrades = this.allGrades.filter((grade) =>
      !this.queryText || grade.name.toLocaleLowerCase().includes(this.queryText.toLocaleLowerCase()) ||
      grade.id.toLocaleLowerCase().includes(this.queryText.toLocaleLowerCase())
    )
  }

  createNewTrainee() {
    // bypassing the routing reuse-stratgy by navigateing By Url.
    this.router.navigateByUrl('/' + TRAINEE)
  }

  selectTrainee(gradeId: string, i: number) {
    //select the trainee row - change the class and hold the data for the "removeTrainee" function
    this.selectedTraineeId = gradeId
    this.selectedRow = i

  }

  removeTrainee() {
    // the task instructions specifayied to remove the entire user from the DB (not only the grade)
    // would require minimal change to remove the grade only
    this.dataService.removeTraineeById(this.selectedTraineeId)
      .then(() => {
        this.toast.pop({
          timeout: 2000,
          type: "success",
          title: 'success',
          body: 'user removed',
        })
      }).catch((err) => {
        this.toast.pop({
          timeout: 2000,
          type: "error",
          title: 'error',
          body: 'user could not be removed',
        })
        console.log(err)
      })
  }
}
