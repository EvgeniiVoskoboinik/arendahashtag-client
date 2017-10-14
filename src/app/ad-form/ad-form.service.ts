import {Injectable} from '@angular/core';
import {VK_API_VERSION, VkApiService, GROUP_ID} from '../shared/services/vk.api.service';
import {Http} from '@angular/http';
import {AdState} from '../shared/redux/interfaces';
import {BaseRes, CitiesReq, CreateWallPostReq} from '../shared/interfaces/vk.api.interfaces';
import {SharedService} from '../shared/shared.service';

interface GetWallUploadServerReq {
 v: number;
}
interface GetWallUploadServerRes {
  upload_url: string;
  album_id: number;
  user_id: number;
}
interface SaveWallPhotoItem{
  access_key: string;
  album_id: number;
  date: number;
  height: number;
  id: number;
  owner_id: number;
  photo_75: string;
  photo_130: string;
  photo_604: string;
  photo_807: string;
  photo_1280: string;
  text: string;
  width: number;
}

@Injectable()
export class AdFormService{
  constructor(
    private vkApiService: VkApiService,
    private http: Http,
    private sharedService: SharedService,
  ) {}

  private loadedCities: any[];

  loadAttachments(files: FileList): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!files || !files.length) return resolve(null);

      let params: GetWallUploadServerReq = {v: 5.68};

      VK.Api.call('photos.getWallUploadServer', params, (uploadServer: BaseRes<GetWallUploadServerRes>) => {
        let formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append(`file${i + 1}`, files[i], files[i].name);
        }
        this.http.post('/api/uploadPhotos?server=' + encodeURIComponent(uploadServer.response.upload_url), formData)
          .map(x => x.json())
          .subscribe(metaJson => {
             const req = {
               user_id: this.sharedService.vkUserData.session.mid,
               ...JSON.parse(metaJson),
               v: VK_API_VERSION,
             };
             VK.Api.call('photos.saveWallPhoto', req, (loadedItemsRes: BaseRes<SaveWallPhotoItem[]>) => {
               const {error, response} = loadedItemsRes;
               if (error) return reject(error);

               const attachments: string = response
                 .map(loadedItem => `photo${loadedItem.owner_id}_${loadedItem.id}`)
                 .join(',');
               return resolve(attachments);
             });
           }, error => {
             reject(error);
           },
          );
      });
    });
  }

  post(adState: AdState, attachments: string, useUserWall: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      const createWallPostReq: CreateWallPostReq = {
        owner_id: useUserWall ? this.sharedService.vkUserData.session.mid : GROUP_ID,
        message: this.vkApiService.createWallPostMessage(adState),
        v: VK_API_VERSION,
        attachments: attachments,
      };

      VK.Api.call('wall.post', createWallPostReq, data => {
        let {error, response} = data;
        if (error) return reject(error);

        return resolve({...response, owner_id: createWallPostReq.owner_id});
      });
    });
  }

  getCities(str?: string): Promise<any> {
    return new Promise((resolve, reject) => {

      if (str === null) {
        if (this.loadedCities) return resolve(this.loadedCities);
      }

      let params: CitiesReq = {
        country_id: 1,
        v: VK_API_VERSION,
        count: 50,
      };
      if (str) {
        params.q = str;
      }

      VK.Api.call('database.getCities', params, data => {
        let {error, response} = data;

        if (error) return reject(error);

        this.loadedCities = response.items.map(x => {
          let description = '';
          if (x.area) description = `${x.area}, `;
          if (x.region) description += x.region;

          return {
            id: x.id,
            title: x.title,
            tag: VkApiService.createCityHashtag(x),
            description: description.trim(),
          };
        });

        resolve(this.loadedCities);
      });
    });
  }
}
