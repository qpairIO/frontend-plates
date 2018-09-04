import { D3ChartModule } from './d3-chart.module';

describe('D3ChartModule', () => {
  let d3ChartModule: D3ChartModule;

  beforeEach(() => {
    d3ChartModule = new D3ChartModule();
  });

  it('should create an instance', () => {
    expect(d3ChartModule).toBeTruthy();
  });
});
