import { QuikWikPage } from './app.po';

describe('quik-wik App', function() {
  let page: QuikWikPage;

  beforeEach(() => {
    page = new QuikWikPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
