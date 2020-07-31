import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { NgModule }      from '@angular/core';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WeatherService } from '../weather.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherdata: any;
  cityname: string;
  weatherlist:any[]=[];

  constructor( public dialog: MatDialog, private weatherservice: WeatherService) { }

  async weatherpopup() {

    console.log(this.cityname);
    await this.weatherservice.getData(this.cityname).toPromise()
    .then((data)=>{
      console.log("weatherdata: ", data)
      console.log(data.name);
      this.weatherdata=data;
    })
    .catch(error => {
      this.weatherdata={}
      this.weatherdata.error=true;
      this.weatherdata.city=this.cityname;
      console.log("error");
      
    });

  
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      data: { weatherdata: this.weatherdata}


    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.weatherdata = result;
      if(result){
      this.weatherlist.push(result);
      console.log("wl:",  this.weatherlist)
      }
    });
  }

  remove(){
    alert("Did not completed due to time limit")
  }

//   remove(){
//     const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
//       width: '250px',
//       data: { weatherdata: this.weatherdata}

//   })

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed');
//     // this.weatherdata = result;
//     if(result){
//     this.weatherlist.push(result);
//     console.log("wl:",  this.weatherlist)
//     }
//   });
// }

  ngOnInit() {
  }

}


@Component({
  selector: 'app-weather',
  templateUrl: './weatherpopup.html',
  styleUrls: ['./weather.component.css']
})
export class DialogOverviewExampleDialog {
  dialogdata:any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.dialogdata=data;
      console.log(this.dialogdata);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closing(){
  
    console.log(this.dialogdata)
    return this.dialogdata.weatherdata;
  }

}
