import { OgranizationModule } from './ogranization.module';

describe('OgranizationModule', () => {
  let ogranizationModule: OgranizationModule;

  beforeEach(() => {
    ogranizationModule = new OgranizationModule();
  });

  it('should create an instance', () => {
    expect(ogranizationModule).toBeTruthy();
  });
});
