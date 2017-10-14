import {FeedItemDTO, Attachment, PostGroup, PostUser} from './vk.api.interfaces';

const VK_LINK = 'https://vk.com/';

interface Signer {
  link: string;
  title: string;
}

export class FeedItem {
  id: number;
  date: number; // in ms
  fromId: number;
  ownerId: number; // if negative - group
  text: string; //html
  attachments: Attachment[]; //only photos
  link: string; //link to post

  displayName: string; // fullName
  screenName: string; //used to link to page
  ownerLink: string; // link to group/user
  ownerImageLink: string; //link to avatar
  repost: FeedItem;
  copy_history: FeedItemDTO[];
  signer: Signer;

  /* tslint:disable:cyclomatic-complexity */

  private fillFromDto(dto: FeedItemDTO, groups: PostGroup[], profiles: PostUser[]) {
    this.id = dto.id;
    this.date = dto.date * 1000;
    this.fromId = dto.from_id;
    this.ownerId = dto.owner_id;
    this.text = dto.text.replace(/\n/g, '<br />');
    this.attachments = dto.attachments ? dto.attachments.filter(x => x.type === 'photo') : null;
    this.link = FeedItem.getWallPostLink(this.ownerId, this.id);

    if (this.fromId < 0) {
      let group = groups.find(x => x.id === Math.abs(this.fromId));
      if (!group) {
        this.setDefault();
        return;
      }

      this.displayName = group.name;
      this.screenName = group.screen_name;
      this.ownerLink = FeedItem.profileLink(group.screen_name);
      this.ownerImageLink = group.photo_50;
    } else {
      let user = profiles.find(x => x.id === this.fromId);
      if (!user) {
        this.setDefault();
        return;
      }

      this.displayName = FeedItem.createDisplayName(user);
      this.screenName = user.screen_name;
      this.ownerLink = FeedItem.profileLink(user.screen_name);
      this.ownerImageLink = user.photo_50;
    }

    if (dto.copy_history && dto.copy_history.length) {
      this.copy_history = dto.copy_history;

      let history = dto.copy_history.slice();
      let historyItem = history.shift();
      historyItem.copy_history = history;
      this.repost = FeedItem.createFromDto(historyItem, groups, profiles);
    }

    if (dto.signer_id) {
      let signerProfile = profiles.find(x => x.id === dto.signer_id);
      let id = `id${dto.signer_id}`;

      let address = signerProfile ? signerProfile.screen_name : id;
      this.signer = {
        link: FeedItem.profileLink(address),
        title: signerProfile ? FeedItem.createDisplayName(signerProfile) : id,
      };
    }
  }

  private setDefault() {
    let id = `id${Math.abs(this.fromId)}`;
    this.displayName = id;
    this.screenName = id;
    this.ownerLink = FeedItem.profileLink(this.screenName);
    this.ownerImageLink = 'https://vk.com/images/camera_50.png';
  }

  static createDisplayName(user: PostUser): string {
    let name = '';
    if (user.first_name) {
      name += user.first_name;
    }
    if (user.last_name) {
      name += ` ${user.last_name}`;
    }
    return name.trim();
  }

  static createFromDto(dto: FeedItemDTO, groups: PostGroup[], profiles: PostUser[]): FeedItem {
    let obj = new FeedItem();
    obj.fillFromDto(dto, groups, profiles);
    return obj;
  }

  static getWallPostLink(ownerId: string|number, postId: string|number): string {
    return `${VK_LINK}wall${ownerId}_${postId}`;
  }
  static profileLink(address: string | number): string {
    return `${VK_LINK + address}`;
  }
}
