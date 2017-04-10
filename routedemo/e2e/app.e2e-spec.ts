import { RoutedemoPage } from './app.po';

describe('routedemo App', () => {
  let page: RoutedemoPage;

  beforeEach(() => {
    page = new RoutedemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
