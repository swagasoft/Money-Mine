import { MatTableModule, MatSelectModule, MatOptionModule,
   MatFormFieldModule, MatCardModule, MatToolbarModule, MatSidenavModule} from '@angular/material';
import { MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
  ],
  exports: [
    MatTableModule,
    MatSelectModule,
    MatSidenavModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    MatInputModule
  ]
})

export class  MaterialModule {}
