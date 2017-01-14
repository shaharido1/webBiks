import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from './../../services/data.service'
import { ITrainee, IGrade, ISubjects } from './../interface'
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-create-trainee',
  templateUrl: './create-trainee.component.html',
  styleUrls: ['./create-trainee.component.css']
})
export class CreateTraineeComponent implements OnInit, OnDestroy {
  updateOrSave: Boolean = true;
  sub: Subscription
  subjects: ISubjects[]
  trainee: ITrainee;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService,
    public toast: ToasterService,
    public vRef: ViewContainerRef) {
  }


  ngOnInit() {
    console.log("oninit")
    //getting the subject list async from server
    this.dataService.getSubjects().subscribe(res => {
      this.subjects = res
    })
    //getting snapshot of the url
    if (this.route.snapshot.params['id']) {
      //fetching data from server
      this.sub = this.dataService.getTraineeById(this.route.snapshot.params['id'])
        .subscribe((trainee) => {
          this.trainee = trainee
        })
    }
    else {
      this.updateOrSave = false
      this.cleanForm()
    }
  }

  cleanForm() {
    this.trainee = {
      address: { city: "", country: "", street: "", zip: "" },
      dateJoin: "",
      email: "",
      id: "",
      name: "",
      grades: []
    }
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe() }
  }

  setTrainee() {
    //assinging the data to a new object to avoid reuse
    let traineeToSet: ITrainee = Object.assign({}, this.trainee)
    this.dataService.setTrainee(traineeToSet)
      .then(() => {
        this.toast.pop({
          timeout: 500,
          type: "success",
          title: 'success',
          body: 'user updated',
        })
      })
      .catch((err) => { 
        this.toast.pop({
          timeout: 500,
          type: "error",
          title: 'error',
          body: 'user could not updated',
        })})
  }

  addNew() {
    if (!this.trainee.grades) { this.trainee.grades = [] }
    //setting a new "empty row"
    setTimeout(() => {
      this.trainee.grades.push({
        date: "2016-11-30",
        score: 0,
        subject: { name: "" },
        // creating an injective key by the second.
        // in a real case i would push it to the DB to get a real injuctive key (or use some outer libary)
        index: Date.now().toString()
      })
    }, 1000)
  }

}
