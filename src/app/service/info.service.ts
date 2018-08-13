import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {InfocodesService} from './infocodes.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class InfoService {

  constructor(private toastr: ToastrService,
              private errorService: InfocodesService) {
  }

  alertInformation(error: string, message: string) {
    switch (error) {
      case this.errorService.INFO: {
        this.toastr.info(message);
        break;
      }
      case this.errorService.SUCCESS: {
        this.toastr.success(message);
        break;
      }
      case this.errorService.WARNING: {
        this.toastr.warning(message);
        break;
      }
      case this.errorService.ERROR: {
        this.toastr.error(message);
        break;
      }
    }
  }
}
