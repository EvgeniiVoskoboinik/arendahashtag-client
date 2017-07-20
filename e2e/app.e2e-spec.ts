import { ArendaHashtagPage } from './app.po';

describe('arenda-hashtag App', () => {
  let page: ArendaHashtagPage;

  beforeEach(() => {
    page = new ArendaHashtagPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
