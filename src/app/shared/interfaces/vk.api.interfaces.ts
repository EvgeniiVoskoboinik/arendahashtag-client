interface ResError {
  error_code: number;
  error_msg: string;
}
export interface BaseRes<T> {
  error: ResError;
  response: T;
}
export interface DbReq{
  need_all?: 1|0;
  offset?: number;
  count?: number;
  v: number;
}
export interface DbRes <T>{
  response: {
    count: number;
    items: T[];
  };
}
export interface VkPlace{
  id: number;
  title: string;
}

export interface CountriesReq extends DbReq{
  code?: string;
}
export interface VkCountry extends VkPlace{

}

export interface CitiesReq extends DbReq{
  country_id: number;
  region_id?: number;
  q?: string;
}
export interface VkCity extends VkPlace{
  area?: string;
  region: string;
}

export interface Photo{
  id: number;
  album_id: number;
  owner_id: number;
  photo_75?: string;
  photo_130?: string;
  photo_604?: string;
  photo_807?: string;
  photo_1280?: string;
  width: number;
  height: number;
  text: string;
  date: number;
  post_id: number;
  access_key: string;
}
export interface Attachment{
  type: 'photo'|'video';
  photo?: Photo;
  video?: any;
}
export interface FeedItemDTO{
  id: number;
  date: number;
  owner_id: number; //if negative - group
  from_id: number; //if negative - group
  // post_type: string;
  text: string;
  // can_edit?: 1|0;
  // can_delete?: 1|0;
  // created_by?: number;
  attachments?: Attachment[];
  copy_history?: FeedItemDTO[];
  // post_source?: {
  //   type: 'string';
  // };
  // comments: {
  //   count: number;
  //   groups_can_post: boolean;
  //   can_post: number;
  // };
  // likes: {
  //   count: number;
  //   user_likes: number;
  //   can_like: number;
  //   can_publish: number;
  // };
  // reposts: {
  //   count: number;
  //   user_reposted: number;
  // };
}

export interface PostUser{
  id: number;
  first_name: string;
  last_name: string;
  online: number;
  photo_50: string;
  screen_name: string;
  sex: number;
}
export interface PostGroup{
  id: number;
  is_closed: 0|1;
  name: string;
  photo_50: string;
  screen_name: string;
  type: string;
}

export interface SearchRes {
  count: number;
  groups: PostGroup[];
  profiles: PostUser[];
  items: FeedItemDTO[];
}
export interface FeedSearchRes extends SearchRes {
  /*
  * В группе и профайле информация только о том кто разместил пост и репостнутый пост
  * */
  next_from: string;
  total_count: number;
}
export interface FeedSearchReq {
  q: string;
  extended?: 1|0; // 0 by default
  count?: number; //30. Max: 1000
  start_time?: number; //day ago by default
  end_time?: number; //not by default
  start_from?: number;
  fields?: string;
  v: number;
}
export interface WallSearchReq {
  owner_id: number;
  query: string;
  extended?: 1|0; // 0 by default
  count?: number; //20. Max: 100

  offset?: number; //0
  fields?: string;
  v: number;
}
export interface WallSearchRes extends SearchRes{

}

export interface VkSession {
  expire: number;
  mid: string;
  secret: string;
  sid: string;
  sig: string;
  user?: VkUserData;
}

export interface VkStatus {
  session?: VkSession;
  status?: 'connected' | 'unknown' | 'not_authorized';
}

export interface VkAuthRes {
  first_name: string;
  hash: string;
  last_name: string;
  photo: string;
  photo_rec: string;
  session: VkSession;
  uid: number;
}
export interface VkUserData{
  domain?: string;
  first_name?: string;
  hash?: string;
  last_name?: string;
  photo?: string;
  photo_rec?: string;
  href?: string;
  id?: string;
}
export interface CreateWallPostReq {
  v: number;
  owner_id?: number|string; //by default current user
  friends_only?: 1|0; //0
  message: string;
  // from_group?: 1|0;
  // signed?: 1|0;

  /* <type><owner_id>_<media_id>,<type><owner_id>_<media_id>
   *
    * type: photo
    * */
  attachments?: string;
}
