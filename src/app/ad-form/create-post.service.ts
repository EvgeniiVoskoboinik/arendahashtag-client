import {Injectable} from '@angular/core';
import {VK_API_VERSION, VkApiService} from '../shared/services/vk.api.service';
import {Http} from '@angular/http';
import {AdState} from '../shared/redux/interfaces';
import {BaseRes, CreateWallPostReq} from '../shared/interfaces/vk.api.interfaces';
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
export class CreatePostService{
  constructor(
    private vkApiService: VkApiService,
    private http: Http,
    private sharedService: SharedService,
  ) {

  }

  createWallPost(adState: AdState, files: FileList): Promise<any> {
    if (files && files.length > 0) {
      let params: GetWallUploadServerReq = {v: 5.68};

      return new Promise((resolve, reject) => {
        VK.Api.call('photos.getWallUploadServer', params, (uploadServer: BaseRes<GetWallUploadServerRes>) => {
          let formData: FormData = new FormData();
          for (let i = 0; i < files.length; i++) {
            formData.append(`file${i + 1}`, files[i], files[i].name);
          }
          this.http.post('/api/uploadPhotos?server=' + encodeURIComponent(uploadServer.response.upload_url),
            formData)
            .map(x => x.json())
            .subscribe(
              metaJson => {
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

                  this.post(adState, attachments, data => {
                    resolve(data);
                  });

                });
              },
              error => {
                reject(error);
              },
            );
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.post(adState, null, data => {
          resolve(data);
        });
      });
    }
  }

  private post(adState: AdState, attachments: string, cb: Function) {
    const createWallPostReq: CreateWallPostReq = {
      message: this.vkApiService.createWallPostMessage(adState),
      v: VK_API_VERSION,
      attachments: attachments,
    };

    VK.Api.call('wall.post', createWallPostReq, data => {
      cb(data);
    });
  }
}
