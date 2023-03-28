declare module '*.module.css';
declare module '*.module.scss';
declare module '*.module.sass';

declare module '*.svg';
declare module '*.svg?raw';
declare enum APP_VERSION {}

//
declare module JSX {
  type MatchDetailedHTMLProps = {
    pattern: boolean | string | null | any;
    map: any[];
  };

  type ValueDetailedHTMLProps = {
    is?: any;
  };

  type MapDetailedHTMLProps = {
    value: any;
    children?: any;
  };

  interface IntrinsicElements {
    match: MatchDetailedHTMLProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    value: any; //ValueDetailedHTMLProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    map: MapDetailedHTMLProps;
  }
}
