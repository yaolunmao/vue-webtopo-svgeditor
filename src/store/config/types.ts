export interface IPositionCenter {
  svg: IPositionCenterSvg;
}
export interface IPositionCenterSvg {
  background_color: string;
  scale: number;
  position_center: {
    x: number;
    y: number;
  };
  svg_position_center: {
    x: number;
    y: number;
  };
  grid: boolean;
  ruler: boolean;
}
