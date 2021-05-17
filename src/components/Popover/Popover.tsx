import { ClassNames } from '@emotion/react';
import { Popover as HeadLessPopover, Transition } from '@headlessui/react';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { bluredBg } from '$/styles/common';

import { Button } from '../Button';

export type Placement = 'top' | 'topEnd';

export interface IPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  buttonProps?: $TsAny;
  buttonAs?: React.FunctionComponent<$TsAny>;
  /**
   * TODO
   */
  placement?: Placement;
  /**
   * Close panel automatically when clicking the content of the panel.
   * @default true
   */
  autoClose?: boolean;
}

export function Popover({
  autoClose = true,
  buttonProps,
  buttonAs,
  children,
  content,
}: IPopoverProps): JSX.Element {
  const buttonRef: React.RefObject<HTMLButtonElement> = React.useRef(null);
  const handleClickPanel = () => {
    if (autoClose) {
      buttonRef.current?.click();
    }
  };

  return (
    <HeadLessPopover tw="relative">
      {({ open }) => (
        <>
          <HeadLessPopover.Button {...buttonProps} as={buttonAs || Button} ref={buttonRef}>
            {children}
          </HeadLessPopover.Button>
          <ClassNames>
            {({ css }) => (
              <Transition
                show={open}
                enter={css(tw`transition duration-100 ease-out`)}
                enterFrom={css(tw`transform opacity-0`)}
                enterTo={css(tw`transform opacity-100`)}
                leave={css(tw`transition ease-out`)}
                leaveFrom={css(tw`transform opacity-100`)}
                leaveTo={css(tw`transform opacity-0`)}
              >
                <HeadLessPopover.Panel
                  static
                  css={[tw`absolute right-0 z-10`, panelBorder]}
                  style={{
                    bottom: (buttonRef.current?.getBoundingClientRect().height || 40) + 16,
                    transform: `translateX(calc(50% - ${
                      (buttonRef.current?.getBoundingClientRect().width || 40) / 2
                    }px))`,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <div
                    css={[tw`relative py-2 px-4 rounded-lg`, panelBg, panelBorder]}
                    onClick={handleClickPanel}
                    onKeyDown={handleClickPanel}
                    role="button"
                    tabIndex={0}
                  >
                    {content}
                  </div>
                  <div
                    css={[
                      tw`absolute h-4 w-4 transform rotate-45`,
                      panelBg,
                      tw`border-t-0 border-l-0`,
                    ]}
                    style={{
                      bottom: '-8px',
                      right: 'calc(50% - 8px)',
                    }}
                  />
                </HeadLessPopover.Panel>
              </Transition>
            )}
          </ClassNames>
        </>
      )}
    </HeadLessPopover>
  );
}

const panelBg = [bluredBg, tw`border border-gray-500 border-opacity-10`];
const panelBorder = tw`rounded-lg`;
