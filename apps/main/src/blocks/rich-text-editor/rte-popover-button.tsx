import { Editor } from '@tiptap/react';
import * as React from 'react';

import { Button } from '$/components/button';
import { IconImage } from '$/components/icons';
import { Popover } from '$/components/popover';
import { TextField } from '$/components/text-field';

import { BaseMarkButton } from './format-buttons';

export type RTEPopoverButtonProps = {
  label: string;
  onClickGo: (inputValue: string) => void;
  children: React.ReactNode;
};

export function RTEPopoverButton({
  label,
  onClickGo,
  children,
}: RTEPopoverButtonProps): JSX.Element {
  const [value, setValue] = React.useState('');
  return (
    <Popover>
      <Popover.Button as={BaseMarkButton}>{children}</Popover.Button>
      <Popover.Panel
        autoClose={false}
        styles={{
          panel: 'flex flex-row items-center',
        }}
      >
        <TextField
          label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          variant="solid"
          color="primary"
          size="sm"
          onClick={() => {
            onClickGo(value);
            setValue('');
          }}
        >
          Go
        </Button>
      </Popover.Panel>
    </Popover>
  );
}
