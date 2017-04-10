import { DemoProjPage } from './app.po';

describe('demo-proj App', function() {
  let page: DemoProjPage;

  beforeEach(() => {
    page = new DemoProjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
