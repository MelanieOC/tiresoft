import { Component, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  photo: any = null
  photoFile: any = null

  photos: {
    resizing$: {
      photoURL: Observable<boolean>,
    },
    data: {
      photoURL: File,
    }
  } = {
      resizing$: {
        photoURL: new BehaviorSubject<boolean>(false),
      },
      data: {
        photoURL: null,
      }
    }


  constructor(
    public dbs: DatabaseService,
    private ng2ImgMax: Ng2ImgMaxService
  ) { }

  ngOnInit(): void {
  }

  readFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.photo = reader.result;
  }

  addNewPhoto(formControlName: string, image: File[]) {
    this.photo = null;
    if (image.length === 0)
      return;
    //this.tempImage = image[0];
    let reader = new FileReader();

    this.photos.resizing$[formControlName].next(true);

    this.ng2ImgMax.compressImage(image[0], 3)
      .pipe(
        take(1)
      ).subscribe(
        result => {
          this.photos.data[formControlName] = new File([result], formControlName + result.name.match(/\..*$/));
          this.photoFile = result
          reader.readAsDataURL(image[0]);
          reader.onload = (_event) => {
            this.photo = reader.result;
            this.photos.resizing$[formControlName].next(false);
          }
        },
        error => {
          this.photos.resizing$[formControlName].next(false);
          Swal.fire({
            text: 'Por favor, elija una imagen en formato JPG, o PNG',
            icon: 'info',
            heightAuto: false
          });
          this.photo = null;

        }
      );
  }

  save(){
    const formData = new FormData();
    formData.append('img_neumatico', this.photoFile);
    this.dbs.saveImage(formData).subscribe(resp=>{
      console.log(resp)
      Swal.fire({
        text: 'Imagen guardada',
        icon: 'success',
        heightAuto: false
      });
    })
  }
}
