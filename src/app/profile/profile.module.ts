import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';

import { ProfilePageRoutingModule } from './profile-routing.module';

// PrimeNG
import { DatePicker } from 'primeng/datepicker';

// Timeline Components
import { ProfileTimelineEditorComponent } from './profile-timeline-editor/profile-timeline-editor.component';
import { TimelineItemModalComponent } from './profile-timeline-editor/timeline-item-modal/timeline-item-modal.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfilePageRoutingModule,
    DatePicker
  ],
  declarations: [
    ProfilePage,
    ProfileTimelineEditorComponent,
    TimelineItemModalComponent,
    SafePipe
  ]
})
export class ProfilePageModule {}

