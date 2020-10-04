import * as React from 'react';

export type ISettingIconProps = React.ComponentProps<'svg'> & {
  size?: number;
};

export function SettingIcon(props: ISettingIconProps): JSX.Element {
  const { size, ...svgProps } = props;
  return (
    <svg
      {...svgProps}
      width={props.size}
      height={props.size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10ZM12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10Z"
        fill="#2E3A59"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.429666 6.57627L2.24977 3.42375C2.48474 3.01677 2.97139 2.82831 3.41918 2.97089L5.25615 3.55576C5.50127 3.37551 5.7556 3.21016 6.01766 3.06011C6.2673 2.91655 6.52543 2.78606 6.79109 2.6696L7.20307 0.786304C7.30349 0.32722 7.71003 0 8.17997 0H11.8202C12.2901 0 12.6966 0.32722 12.7971 0.786304L13.209 2.6696C13.4909 2.79318 13.7643 2.93254 14.0281 3.08657C14.274 3.22954 14.513 3.38604 14.7438 3.55576L16.5808 2.97089C17.0286 2.82831 17.5152 3.01678 17.7502 3.42375L19.5703 6.57627C19.8052 6.98325 19.7251 7.49893 19.3778 7.81544L17.9528 9.11387C17.9855 9.40883 18.0015 9.70429 18.0013 9.99888C18.0016 10.2942 17.9856 10.5904 17.9528 10.8862L19.3778 12.1846C19.7251 12.5011 19.8052 13.0168 19.5703 13.4238L17.7502 16.5763C17.5152 16.9832 17.0286 17.1717 16.5808 17.0291L14.7438 16.4443C14.5102 16.6161 14.2682 16.7743 14.0191 16.9187C13.7581 17.0706 13.4877 17.2082 13.209 17.3304L12.7971 19.2137C12.6966 19.6728 12.2901 20 11.8202 20H8.17997C7.71003 20 7.30349 19.6728 7.20307 19.2137L6.7911 17.3304C6.52852 17.2153 6.27331 17.0865 6.02638 16.9449C5.76124 16.7935 5.50398 16.6265 5.25614 16.4443L3.41918 17.0291C2.97139 17.1717 2.48474 16.9832 2.24977 16.5763L0.429665 13.4238C0.194696 13.0168 0.274808 12.5011 0.622174 12.1846L2.04717 10.8862C2.01442 10.5908 1.99836 10.295 1.99864 9.99999C1.99836 9.70503 2.01442 9.40919 2.04717 9.11386L0.622175 7.81544C0.274809 7.49893 0.194696 6.98324 0.429666 6.57627ZM11.0153 2L11.473 4.09226L12.406 4.50132C12.6171 4.59382 12.8219 4.69821 13.0197 4.8137L13.0229 4.81557C13.2072 4.92275 13.3862 5.04 13.559 5.16703L14.3798 5.77058L16.4206 5.12082L17.4358 6.87921L15.8527 8.3217L15.965 9.3343C15.9894 9.5551 16.0015 9.77644 16.0013 9.9973L16.0013 10.001C16.0015 10.2225 15.9895 10.4444 15.965 10.6657L15.8527 11.6783L17.4358 13.1208L16.4206 14.8792L14.3798 14.2294L13.559 14.833C13.3841 14.9616 13.2028 15.0801 13.0161 15.1884L13.0129 15.1902C12.8172 15.3042 12.6146 15.4072 12.406 15.4987L11.473 15.9077L11.0153 18H8.98486L8.52718 15.9077L7.5941 15.4987C7.39755 15.4125 7.20637 15.316 7.02125 15.2099L7.01798 15.208C6.81918 15.0945 6.62647 14.9694 6.44096 14.833L5.62017 14.2294L3.57937 14.8792L2.56416 13.1208L4.14728 11.6783L4.03498 10.6657C4.01047 10.4446 3.99843 10.223 3.99864 10.0019L3.99864 9.99813C3.99843 9.77698 4.01047 9.55537 4.03498 9.3343L4.14728 8.3217L2.56416 6.87921L3.57937 5.12081L5.62017 5.77058L6.44096 5.16703C6.62444 5.03211 6.81496 4.90824 7.01145 4.79574L7.01471 4.79386C7.20187 4.68623 7.39523 4.58849 7.5941 4.50132L8.52718 4.09226L8.98486 2H11.0153Z"
        fill="#2E3A59"
      />
    </svg>
  );
}
