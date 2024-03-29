import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  CreateUserDto,
  RoleDto,
  UserDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  templateUrl: './create-user-dialog.component.html'
})
export class CreateUserDialogComponent extends AppComponentBase
  implements OnInit {

  saving = false;
  user = new CreateUserDto();
  roles: RoleDto[] = [];
  checkedRolesMap: { [key: string]: boolean } = {};
  defaultRoleCheckedStatus = false;

  transfusionCenters: UserDto[] = [];
  hospitals: UserDto[] = [];

  passwordValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'pattern',
      localizationKey:
        'Passwords must be at least 8 characters, contain lowercase, uppercase & number',
    },
  ];

  confirmPasswordValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'validateEqual',
      localizationKey: 'Passwords do not match',
    },
  ];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _userService: UserServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.user.isActive = true;

    this._userService.getRoles().subscribe((result) => {
      this.roles = result.items;
      this.setInitialRolesStatus();
    });

    if (this.isGranted('Admin')) {
      this._userService
        .getTransfusionCenters()
        .subscribe((result) => {
          this.transfusionCenters = result.items;
        });

      this._userService
        .getHospitals()
        .subscribe((result) => {
          this.hospitals = result.items;
        });
    }
  }

  setInitialRolesStatus(): void {
    _map(this.roles, (item) => {
      this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
        item.normalizedName
      );
    });
  }

  isRoleChecked(normalizedName: string): boolean {
    // just return default role checked status
    // it's better to use a setting
    return this.defaultRoleCheckedStatus;
  }

  onRoleChange(role: RoleDto, $event) {
    this.checkedRolesMap = {}; // reinitialize role map in order to only get the last checked one
    this.checkedRolesMap[role.normalizedName] = $event.target.checked;
  }

  getCheckedRoles(): string {
    const roles: string[] = [];
    _forEach(this.checkedRolesMap, function (value, key) {
      if (value) {
        roles.push(key);
      }
    });

    return roles[0]; //last checked role
  }

  save(): void {
    this.saving = true;

    if (this.isGranted("Admin")) {
      this.user.roleNames = new Array<string>(this.getCheckedRoles());
    }
    else if (this.isGranted("CenterAdmin")) {
      this.user.roleNames = new Array<string>("CenterPersonnel");
      this.user.employerId = this.appSession.userId;
    }
    else if (this.isGranted("HospitalAdmin")) {
      this.user.roleNames = new Array<string>("HospitalPersonnel");
      this.user.employerId = this.appSession.userId;
    }

    this._userService
      .create(this.user)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info('Saved successfully');
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
