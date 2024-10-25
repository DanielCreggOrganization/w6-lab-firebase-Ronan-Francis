import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonList, IonItemSliding, IonItem, IonLabel, IonIcon, IonCheckbox, IonItemOptions, IonItemOption, IonFooter, IonText, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline, pencilOutline, trashOutline, add } from 'ionicons/icons';
import { AuthService } from '../auth.service';
import { TasksService, Task } from '../tasks.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonItemOptions,
    IonItemOption,
    IonFooter,
    IonText,
    IonFab,
    IonFabButton,
  ],
})
export class HomePage {
  userTasks$ = this.tasksService.getUserTasks();
  currentUser$: Observable<User | null>;

  constructor(
    private tasksService: TasksService,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.currentUser$ = this.authService.fetchActiveUser();
  }

  trackById(index: number, item: Task): string {
    return item.id ?? '';
  }

  async editTask(task: Task, slidingItem: IonItemSliding) {
    const alert = await this.alertController.create({
      header: 'Edit Task',
      inputs: [
        {
          name: 'content',
          type: 'text',
          value: task.content,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => slidingItem.close(),
        },
        {
          text: 'Update',
          handler: (data) => {
            this.tasksService.updateTask({ ...task, content: data.content });
            slidingItem.close();
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteTask(task: Task) {
    await this.tasksService.deleteTask(task);
  }

  async signOut() {
    await this.authService.signOutUser();
    this.router.navigate(['/login']);
  }
}