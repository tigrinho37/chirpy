import tw, { css, styled } from 'twin.macro';

const defaultWidth = 1.2;
const defaultHeight = 3.2;
export type CommentBranchProps = {
  hiddenBranch?: boolean;
  width?: number;
  height?: number;
};

// https://codepen.io/rno1d/pen/VaaBxz
export const CommentBranch = styled.li(
  ({ width = defaultWidth, height = defaultHeight, hiddenBranch }: CommentBranchProps) => [
    tw`space-y-2`,

    !hiddenBranch &&
      css`
        position: relative;

        &:before,
        &:after {
          transform: translateY(-0.5rem);
          border-left-width: 1px;
          ${tw`border-gray-300`}
        }

        &:before {
          position: absolute;
          top: 0;
          left: -${width}rem;
          display: block;
          width: ${width}rem;
          height: ${height}rem;
          content: '';
          border-bottom-width: 1px;
          border-bottom-left-radius: 8px;
        }

        &:after {
          position: absolute;
          top: ${height - 0.3}rem;
          bottom: -0.5rem;
          left: -${width}rem;
          display: block;
          content: '';
        }

        &:last-child:after {
          display: none;
        }
      `,
  ],
);
