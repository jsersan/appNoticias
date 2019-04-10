import { Component } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

    constructor( public datalocalservice: DataLocalService) {

    // En el DataLocalService es donde tengo el arragloe de noticias y es donde tengo que leer la información lo pongo publica para ques se pueda utilizar en el html



    }

}
