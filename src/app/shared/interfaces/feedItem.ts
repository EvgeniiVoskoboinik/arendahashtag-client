import {FeedItemDTO, Attachment, PostGroup, PostUser} from './vk.api.interfaces';

const VK_LINK = 'https://vk.com/';

export class FeedItem {
  id: number;
  date: number; // in ms
  ownerId: number; // if negative - group
  text: string; //html
  attachments: Attachment[]; //only photos
  link: string; //link to post

  displayName: string; // fullName
  screenName: string; //used to link to page
  ownerLink: string; // link to group/user
  ownerImageLink: string; //link to avatar

  private fillFromDto(dto: FeedItemDTO, groups: PostGroup[], profiles: PostUser[]) {
    this.id = dto.id;
    this.date = dto.date * 1000;
    this.ownerId = dto.owner_id;
    this.text = dto.text;
    this.attachments = dto.attachments ? dto.attachments.filter(x => x.type === 'photo') : null;
    this.link = FeedItem.getWallPostLink(this.ownerId, this.id);

    if (this.ownerId < 0) {
      let group = groups.find(x => x.id === Math.abs(this.ownerId));
      if (!group) {
        this.setDefault();
        return;
      }

      this.displayName = group.name;
      this.screenName = group.screen_name;
      this.ownerLink = `${VK_LINK + this.screenName}`;
      this.ownerImageLink = group.photo_50;
    } else {
      let user = profiles.find(x => x.id === this.ownerId);
      if (!user) {
        this.setDefault();
        return;
      }
      let name = '';
      if (user.first_name) {
        name += user.first_name;
      }
      if (user.last_name) {
        name += ` ${user.last_name}`;
      }

      this.displayName = name.trim();
      this.screenName = user.screen_name;
      this.ownerLink = `${VK_LINK + this.screenName}`;
      this.ownerImageLink = user.photo_50;
    }
  }

  private setDefault() {
    this.displayName = 'Unknown';
    this.screenName = `id${Math.abs(this.ownerId)}`;
    this.ownerLink = `${VK_LINK + this.screenName}`;
    this.ownerImageLink = null;
  }

  static createFromDto(dto: FeedItemDTO, groups: PostGroup[], profiles: PostUser[]): FeedItem {
    let obj = new FeedItem();
    obj.fillFromDto(dto, groups, profiles);
    return obj;
  }

  static getWallPostLink(ownerId: string|number, postId: string|number): string {
    return `${VK_LINK}wall${ownerId}_${postId}`;
  }
}
