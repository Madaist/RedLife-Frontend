import { RedLifeTemplatePage } from './app.po';

describe('RedLife App', function() {
  let page: RedLifeTemplatePage;

  beforeEach(() => {
    page = new RedLifeTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
