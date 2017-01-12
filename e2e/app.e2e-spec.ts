import { BiksWebPage } from './app.po';

describe('biks-web App', function() {
  let page: BiksWebPage;

  beforeEach(() => {
    page = new BiksWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
