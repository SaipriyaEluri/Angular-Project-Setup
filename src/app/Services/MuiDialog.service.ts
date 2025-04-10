import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';




interface NotificationProps {
  config: ConfigProps;
  type: 'Success' | 'Warn' | 'Error';
}

interface ConfigProps {
  title:String,
  message:string
}

@Injectable({
  providedIn: 'root',
})
export class MuiDialogService {

  // constructor(private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  // openSnackBar(data:any, type:('Success' | 'Warn' | 'Error')) {
  //   let config:NotificationProps={
  //     config:data,
  //     type:type,
  //   }

  //   this._snackBar.openFromComponent(ToastMsgComponent, {
  //     duration: 3000,
  //     horizontalPosition: 'end',
  //     verticalPosition: 'bottom',
  //     data:config,
  //     panelClass:'template-snackbar',
  //   });
  // }


  // confirm(data: ConfirmationModel): Observable<boolean> {
  //   return this.dialog.open(ConfirmationComponent, { data, width: '65vh', minHeight:'45vh', disableClose: true,}).afterClosed();
  // }

 

  // success(data: SuccessModel) : void{
  //   const timeout = 2000;
  //   const dialogRef = this.dialog.open(SuccessComponent,{ data, width: '65vh', minHeight:'40vh', disableClose: true,});

  //   dialogRef.afterOpened().subscribe(_ => {
  //     setTimeout(() => {
  //        dialogRef.close();
  //     }, timeout)
  //   })
  // }


  // openPhotoViewer(data:any) {
  //   let config:PhotoViewerModel={
  //     imagePath:data.imagePath,
  //     gallerys:data.gallerys,
  //   }

  //   this.dialog.open(PhotoViewerComponent, {
  //     data:config,
  //     panelClass:'template-photo-viewer',
  //     width: '50%', minHeight:'470px', disableClose: false,
  //   });
  // }


  // openMusicPlayer(audioPath:string) {
  //   this.dialog.open(MusicPlayerComponent, {
  //     data:audioPath,
  //     panelClass:'template-music-player',
  //     width: '400px', height:'150px', minHeight:'150px', disableClose: false,
  //   });
  // }
}
