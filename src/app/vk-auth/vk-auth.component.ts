import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {VkAuthRes} from '../shared/interfaces/vk.api.interfaces';


@Component({
  selector: 'app-vk-auth',
   templateUrl: './vk-auth.template.html',
   styleUrls: ['./vk-auth.style.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
export class VkAuthComponent implements OnInit{
  constructor(
    private sharedService: SharedService,
  ) {
  }

  ngOnInit() {
    VK.Widgets.Auth('vk_auth', {
      onAuth: (res: VkAuthRes) => {
        console.log(res);
        this.sharedService.vkUserData = res;
        },
    });
  }
}
