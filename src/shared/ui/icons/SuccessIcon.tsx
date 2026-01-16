import type { SVGProps } from "react";
import "./index.scss";

export const SuccessIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="72"
    height="72"
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="SuccessIcon"
    {...props}
  >
    <path
      d="M36 0C16.164 0 0 16.164 0 36C0 55.836 16.164 72 36 72C55.836 72 72 55.836 72 36C72 16.164 55.836 0 36 0ZM53.208 27.72L32.796 48.132C32.292 48.636 31.608 48.924 30.888 48.924C30.168 48.924 29.484 48.636 28.98 48.132L18.792 37.944C17.748 36.9 17.748 35.172 18.792 34.128C19.836 33.084 21.564 33.084 22.608 34.128L30.888 42.408L49.392 23.904C50.436 22.86 52.164 22.86 53.208 23.904C54.252 24.948 54.252 26.64 53.208 27.72Z"
      fill="#2A2A2A"
    />
  </svg>
);
