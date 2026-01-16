import type { SVGProps } from "react";
import "./index.scss";

export const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="108"
    height="96"
    viewBox="0 0 108 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="HeartIcon absolute"
    {...props}
  >
    <path
      d="M77.976 0C68.202 0 59.454 4.74607 54 12.027C48.546 4.74607 39.798 0 30.024 0C13.446 0 0 13.4831 0 30.1483C0 36.5663 1.026 42.4989 2.808 48C11.34 74.9663 37.638 91.0921 50.652 95.5146C52.488 96.1618 55.512 96.1618 57.348 95.5146C70.362 91.0921 96.66 74.9663 105.192 48C106.974 42.4989 108 36.5663 108 30.1483C108 13.4831 94.554 0 77.976 0Z"
      fill="#FF003D"
    />
  </svg>
);
