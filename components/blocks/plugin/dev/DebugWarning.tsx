import { RenderBlock } from '@/components/craft-blocks';
import type { ReactElement } from 'react';

const DebugWarning = (self: RenderBlock & { children?: ReactElement[] }) => (
  <div className='flex flex-col border border-orange-400 rounded overflow-hidden'>
    <div className='bg-orange-100 text-orange-700 px-5 py-5'>
      <strong className='font-bold mr-1'>{self.ctx?.code ?? 'Error'}:</strong>
      {self.ctx?.message ?? 'Something went wrong.'}
    </div>

    {self.children && self.children.length > 0
      ? (
        <div className='border-t border-orange-400 px-5 py-5 flex flex-col gap-4'>
          {self.children}
        </div>
      )
      : null}
  </div>
);

export default DebugWarning;
